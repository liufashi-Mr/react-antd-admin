import { useState } from 'react';
import { usherQueryStyleGet, usherQueryStyleUpdate } from '@/services';
import { Card, Table, Button, Modal, message, Form, Input, Alert } from 'antd';
import { useAntdTable, useRequest } from 'ahooks';
import ReactJson from 'react-json-view';

const CardConfig = ({ methodId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isShowJSON, setIsShowJSON] = useState(true);
  const [updateId, setUpdateId] = useState();
  const { tableProps, run: runQuery } = useAntdTable(() =>
    usherQueryStyleGet(methodId).then(res => ({
      list: res?.data,
    }))
  );
  // 更新
  const { loading: confirmLoading, run: runUpdate } = useRequest(
    options => usherQueryStyleUpdate(options),
    {
      manual: true,
      onSuccess: () => {
        message.success('更新成功');
        setVisible(false);
        runQuery();
      },
    }
  );
  const onFinish = values => {
    runUpdate({ ...values, styleId: updateId, fieldArray: JSON.parse(values.fieldArray || []) });
  };
  const columns = [
    {
      title: '序号',
      width: '6%',
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: '卡片名称',
      dataIndex: 'name',
      width: '8%',
    },
    {
      title: '匹配条件',
      dataIndex: 'script',
      width: '9%',
    },
    {
      title: '匹配字段',
      dataIndex: 'fieldArray',
      width: '8%',
      render: text => JSON.stringify(text),
    },
    {
      title: (
        <>
          <span>配置信息</span>
          <Button
            style={{ marginLeft: 8 }}
            size="small"
            type="link"
            onClick={() => setIsShowJSON(flag => !flag)}
          >
            查看{isShowJSON ? '格式化数据' : '源数据'}
          </Button>
        </>
      ),
      dataIndex: 'config',
      width: '40%',
      render: text => (
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {isShowJSON ? (
            text
          ) : (
            <ReactJson
              name={false}
              src={JSON.parse(text)}
              indentWidth={2}
              collapsed={false}
              enableClipboard={false}
            />
          )}
        </div>
      ),
    },
    {
      title: '下一步',
      dataIndex: 'nextQuery',
      width: '20%',
      render: text => <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{text}</div>,
    },
    {
      title: '操作',
      dataIndex: 'styleId',
      width: '10%',
      render: (styleId, record) => (
        <Button
          type="link"
          onClick={() => {
            setVisible(true);
            setUpdateId(styleId);
            form.setFieldsValue({
              ...record,
              fieldArray: JSON.stringify(record.fieldArray),
            });
          }}
        >
          编辑
        </Button>
      ),
    },
  ];
  return (
    <>
      <Card
        size="small"
        title={
          <div className="global-cardTitle">
            <div>卡片列表</div>
            <Button size="small" type="primary">
              配置卡片
            </Button>
          </div>
        }
      >
        <Table rowKey="styleId" {...tableProps} columns={columns} />
      </Card>
      <Modal
        visible={visible}
        title="更新配置"
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        onOk={form.submit}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          form={form}
          validateMessages={{ required: '${label}不能为空' }}
          onFinish={onFinish}
        >
          <Alert
            message="若修改内容较多点击配置卡片前往调整"
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <Form.Item rules={[{ required: true }]} label="卡片名称" name="name">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="匹配字段" name="script">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="匹配条件" name="fieldArray">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="配置信息" name="config">
            <Input.TextArea autoSize={{ minRows: 2 }} placeholder="请输入" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="下一步" name="nextQuery">
            <Input.TextArea autoSize={{ minRows: 2 }} placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardConfig;
