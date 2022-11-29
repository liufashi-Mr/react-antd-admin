import React, { useState } from 'react';
import { Table, Card, Button, Popconfirm, Modal, message, Form, Input, Select } from 'antd';
import { useAntdTable, useRequest } from 'ahooks';
import {
  usherQueryResultGet,
  usherQueryResultDelete,
  usherQueryResultUpdate,
  usherQueryResultAdd,
} from '@/services';

const OutParameterConfig = ({ methodId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [updateId, setUpdateId] = useState();

  // 获取表格数据
  const { tableProps, run: runQuery } = useAntdTable(() =>
    usherQueryResultGet(methodId).then(res => ({
      list: res?.data,
    }))
  );

  // 更新添加
  const { loading: confirmLoading, run: runAddOrUpdate } = useRequest(
    options => (updateId ? usherQueryResultUpdate(options) : usherQueryResultAdd(options)),
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
    resultId => usherQueryResultDelete(resultId),
    { manual: true }
  );

  //提交修改/更新
  const onFinish = values => {
    runAddOrUpdate({ ...values, methodId, resultId: updateId });
  };
  const columns = [
    {
      title: '序号',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: '已有字段',
      dataIndex: 'getField',
    },
    {
      title: '需要字段',
      dataIndex: 'needField',
    },

    {
      title: '展示标识',
      dataIndex: 'showFlag',
      render: text => (text ? '是' : '否'),
    },
    {
      title: '主列表标识',
      dataIndex: 'mainDataFlag',
      render: text => (text ? '是' : '否'),
    },
    {
      title: '字段描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'resultId',
      render: (resultId, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
              form.setFieldsValue(record);
              setUpdateId(resultId);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除？"
            onConfirm={() =>
              runAsyncDelete(resultId).then(res => {
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
        <Table rowKey="resultId" columns={columns} {...tableProps} />
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
          <Form.Item rules={[{ required: true }]} label="已有字段" name="getField">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="需要字段" name="needField">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="展示标识" name="showFlag">
            <Select placeholder="请选择">
              <Select.Option value={true}>是</Select.Option>
              <Select.Option value={false}>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="主列表标识" name="mainDataFlag">
            <Select placeholder="请选择">
              <Select.Option value={true}>是</Select.Option>
              <Select.Option value={false}>否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="字段描述" name="description">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OutParameterConfig;
