import React, { useState } from 'react';
import { Table, Card, Button, Popconfirm, Modal, message, Form, Input } from 'antd';
import { useAntdTable, useRequest } from 'ahooks';
import {
  usherQueryFilterGet,
  usherQueryFilterDelete,
  usherQueryFilterUpdate,
  usherQueryFilterAdd,
} from '@/services';

const FilterEvent = ({ methodId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();

  // 获取表格数据
  const { tableProps, run: runQuery } = useAntdTable(() =>
    usherQueryFilterGet(methodId).then(res => ({
      list: res?.data,
    }))
  );

  // 更新添加
  const { loading: confirmLoading, run: runAddOrUpdate } = useRequest(
    options => (updateId ? usherQueryFilterUpdate(options) : usherQueryFilterAdd(options)),
    {
      manual: true,
      onSuccess: () => {
        message.success(updateId ? '更新成功' : '添加成功');
        setVisible(false);
        runQuery();
      },
    }
  );

  // 删除
  const { loading: deleteConfirmLoading, runAsync: runAsyncDelete } = useRequest(
    filterId => usherQueryFilterDelete(filterId),
    { manual: true }
  );

  //提交修改/更新
  const onFinish = values => {
    try {
      runAddOrUpdate({
        ...values,
        fieldArray: JSON.parse(values?.fieldArray),
        methodId,
        filterId: updateId,
      });
    } catch (error) {
      message.error('输入格式有误');
    }
  };
  const columns = [
    {
      title: '序号',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '过滤字段',
      dataIndex: 'fieldArray',
      render: text => JSON.stringify(text),
    },
    {
      title: '过滤脚本',
      dataIndex: 'script',
      render: text => JSON.stringify(text),
    },
    {
      title: '操作',
      dataIndex: 'filterId',
      render: (filterId, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
              form.setFieldsValue({ ...record, fieldArray: JSON.stringify(record.fieldArray) });
              setUpdateId(filterId);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除？"
            onConfirm={() =>
              runAsyncDelete(filterId).then(res => {
                if (res.success) {
                  message.success('删除成功');
                  runQuery();
                }
              })
            }
            okButtonProps={{ loading: deleteConfirmLoading }}
          >
            <Button type="link" style={{ marginLeft: 8 }}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Card
        size="small"
        title={
          <div className="global-cardTitle">
            <div>出参列表</div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setVisible(true);
                form.resetFields();
                setUpdateId();
              }}
            >
              添加
            </Button>
          </div>
        }
      >
        <Table rowKey="filterId" columns={columns} {...tableProps} />
      </Card>
      <Modal
        visible={visible}
        title={updateId ? '更新配置' : '添加配置'}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        onOk={form.submit}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          form={form}
          validateMessages={{ required: '${label}不能为空' }}
          onFinish={onFinish}
        >
          <Form.Item rules={[{ required: true }]} label="名称" name="name">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="过滤字段" name="fieldArray">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="过滤脚本" name="script">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FilterEvent;
