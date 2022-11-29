import React, { useState, useEffect } from 'react';
import { Card, Spin, Button, Form, Input, message } from 'antd';
import { useRequest } from 'ahooks';
import {
  usherQueryPreprocessGet,
  usherQueryPreprocessUpdate,
  usherQueryPreprocessAdd,
} from '@/services';

const CatchError = ({ methodId }) => {
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState();
  const { loading, run: runQuery } = useRequest(() => usherQueryPreprocessGet(methodId), {
    onSuccess(res) {
      form.setFieldsValue(res?.data[0]);
      setUpdateId(res?.data[0]?.preprocessId || null);
    },
  });

  const { run: runAddOrUpdate } = useRequest(
    options =>
      updateId
        ? usherQueryPreprocessUpdate({ ...options, preprocessId: updateId })
        : usherQueryPreprocessAdd({ ...options, methodId }),
    {
      manual: true,
      onSuccess() {
        runQuery();
        message.success(updateId ? '更新成功' : '添加成功');
      },
      debounceWait: 300,
    }
  );

  return (
    <div>
      <Card
        size="small"
        title={
          <div className="global-cardTitle">
            <div>异常处理</div>
            <Button size="small" type="primary" onClick={form.submit}>
              保存
            </Button>
          </div>
        }
      >
        <Spin spinning={loading}>
          <div style={{ width: '70%', margin: '12px auto 0' }}>
            <Form
              form={form}
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              onFinish={runAddOrUpdate}
            >
              <Form.Item name="successField" label="成功字段">
                <Input />
              </Form.Item>
              <Form.Item name="successContent" label="成功内容">
                <Input />
              </Form.Item>
              <Form.Item name="msgField" label="提示信息字段">
                <Input />
              </Form.Item>
              <Form.Item name="defaultException" label="异常提示">
                <Input />
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default CatchError;
