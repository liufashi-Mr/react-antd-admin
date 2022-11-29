import React, { useState } from 'react';
import {
  getPageList,
  usherQueryMethodAdd,
  usherQueryMethodDelete,
  usherQueryMethodOnline,
  usherQueryMethodOffline,
} from '@/services';
import { useAntdTable, useRequest } from 'ahooks';
import {
  Table,
  Button,
  Col,
  Form,
  Input,
  Row,
  Card,
  Space,
  Dropdown,
  Menu,
  Popconfirm,
  message,
  Modal,
  Tag,
} from 'antd';
import { SearchOutlined, ReloadOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './index.less';

const HospitalList = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [publishParams, setPublishParams] = useState({ methodId: '', remark: '' });
  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { tableProps, search } = useAntdTable(
    async ({ current, pageSize }, options) => {
      const res = await getPageList({ current: current, size: pageSize, ...options });
      return {
        total: res?.data?.total,
        list: res?.data?.records,
      };
    },
    { form, cacheKey: 'tableCache' }
  );
  const { submit, reset } = search;

  const { runAsync: handleConfirm } = useRequest(
    (type, methodId) => {
      switch (type) {
        case 'publish':
          return usherQueryMethodOnline(publishParams);
        case 'unPublish':
          return usherQueryMethodOffline(methodId);
        case 'delete':
          return usherQueryMethodDelete(methodId);
      }
    },
    { manual: true }
  );

  const { loading: addConfirmLoading, run: addMethod } = useRequest(
    options => usherQueryMethodAdd(options),
    {
      manual: true,
      onSuccess() {
        message.success('添加成功');
        setAddVisible(false);
        submit();
      },
    }
  );

  // return promise 触发Popconfirm的loading效果
  const confirm = async ({ type, methodId }) => {
    const res = await handleConfirm(type, methodId);
    try {
      if (res.success) {
        switch (type) {
          case 'publish':
            message.success('已发布上线');
            setVisible(false);
            break;
          case 'unPublish':
            message.success('已下线');
            break;
          case 'delete':
            message.success('删除成功');
            break;
        }
        submit();
      }
    } finally {
      setConfirmLoading(false);
    }
  };
  const columns = [
    {
      title: '序号',
      render: (_, record, index) => {
        return `${
          (tableProps.pagination.current - 1) * tableProps.pagination.pageSize + (index + 1)
        }`;
      },
    },
    {
      title: '方法名称',
      dataIndex: 'name',
    },
    {
      title: '数据来源',
      dataIndex: 'queryMethodType',
    },
    {
      title: '查询内容',
      dataIndex: 'service',
    },
    {
      title: '数据范围',
      dataIndex: 'queryType',
    },
    {
      title: '医院ID',
      dataIndex: 'corpId',
    },
    {
      title: '医联体ID',
      dataIndex: 'unionId',
    },
    {
      title: '运行状态',
      dataIndex: 'online',
      render: text => (text ? <Tag color="#87d068">已上线</Tag> : <Tag color="#f50">已下线</Tag>),
    },
    {
      title: '操作',
      dataIndex: 'methodId',
      render: text => (
        <>
          <Button
            type="link"
            onClick={() => {
              setPublishParams({ methodId: text, remark: '' });
              setVisible(true);
            }}
          >
            上线
          </Button>
          <Link to={`/configDetail/${text}`}>配置</Link>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key="offline">
                  <Popconfirm
                    title="下线后将立即生效，确定下线？"
                    onConfirm={() => confirm({ type: 'unPublish', methodId: text })}
                  >
                    <Button type="link">下线</Button>
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="delete">
                  <Popconfirm
                    title="删除后将无法恢复，确定删除？"
                    onConfirm={() => confirm({ type: 'delete', methodId: text })}
                  >
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">
              <Space size={4}>
                更多
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <Card>
        <Form form={form}>
          <Row gutter={[24, 0]}>
            <Col span={6}>
              <Form.Item label="医院ID" name="corpId">
                <Input placeholder="请输入医院ID" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={submit} icon={<SearchOutlined />}>
                查询
              </Button>
              <Button onClick={reset} style={{ marginLeft: 16 }} icon={<ReloadOutlined />}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title={
          <div className="global-cardTitle">
            <div>医院/医联体列表</div>
            <Button type="primary" onClick={() => setAddVisible(true)}>
              添加
            </Button>
          </div>
        }
        style={{ marginTop: 16 }}
      >
        <Table
          columns={columns}
          rowKey="methodId"
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
          }}
        />
      </Card>
      <Modal
        visible={visible}
        title="上线备注"
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
        onOk={() => {
          confirm({ type: 'publish' });
          setConfirmLoading(true);
        }}
      >
        <Input.TextArea
          required
          value={publishParams.remark}
          placeholder="请输入此次上线备注"
          rows={3}
          onChange={e => setPublishParams(val => ({ ...val, remark: e.target.value }))}
        />
      </Modal>
      <Modal
        visible={addVisible}
        title="添加机构"
        onCancel={() => setAddVisible(false)}
        confirmLoading={addConfirmLoading}
        onOk={addForm.submit}
      >
        <Form
          form={addForm}
          validateMessages={{ required: '${label}不能为空' }}
          onFinish={val => addMethod(val)}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item rules={[{ required: true }]} label="方法名称" name="name">
            <Input placeholder="请输入方法名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HospitalList;
