import React, { useState, useCallback } from 'react';
import { Col, Row, Card, Form, Input, Select, Button, Tabs, Spin, message } from 'antd';
import InParameterConfig from './components/InParameterConfig';
import OutParameterConfig from './components/OutParameterConfig';
import CatchError from './components/CatchError';
import ReplaceContent from './components/ReplaceContent';
import FilterEvent from './components/FilterEvent';
import CardConfig from './components/CardConfig';
import { useRequest } from 'ahooks';
import { testQuery, usherQueryMethodDetail, usherQueryMethodUpdate, getList } from '@/services';
import ReactJson from 'react-json-view';
import { useParams } from 'react-router-dom';
import styles from './index.less';
import { useEffect } from 'react';

const initConfigForm = serviceList => [
  {
    label: '接口类型',
    name: 'queryMethodType',
    option: (
      <Select placeholder="请选择接口类型">
        <Select.Option value="webService">webService</Select.Option>
        <Select.Option value="http">http</Select.Option>
        <Select.Option value="gateway">gateway</Select.Option>
      </Select>
    ),
  },
  {
    label: '查询服务',
    name: 'service',
    option: (
      <Select placeholder="请选择查询服务">
        {(serviceList || []).map(x => (
          <Select.Option key={x.serviceId} value={x.service}>
            {x.service}
          </Select.Option>
        ))}
      </Select>
    ),
  },
  {
    label: '接口范围',
    name: 'queryType',
    option: (
      <Select placeholder="请选择接口范围">
        <Select.Option value="corp">医院</Select.Option>
        <Select.Option value="union">医联体</Select.Option>
      </Select>
    ),
  },
  {
    label: '携带cookie',
    name: 'needCookie',
    option: (
      <Select placeholder="请选择是否需要cookie">
        <Select.Option value={true}>是</Select.Option>
        <Select.Option value={false}>否</Select.Option>
      </Select>
    ),
  },
  {
    label: '响应类型',
    name: 'resultType',
    option: (
      <Select placeholder="请选择响应类型">
        <Select.Option value="xml">xml</Select.Option>
        <Select.Option value="json">json</Select.Option>
      </Select>
    ),
  },
  {
    label: '请求地址',
    name: 'url',
    placeholder: '请输入请求地址',
  },
  {
    label: '结果字段',
    name: 'mainDatePath',
    placeholder: '请输入结果字段',
  },
  {
    label: 'ws方法',
    partial: true,
    name: 'queryMethod',
    placeholder: '请输入webservice方法',
  },
  {
    label: 'soapAction',
    partial: true,
    name: 'soapAction',
    placeholder: '请输入soapAction',
  },
];

// 使用函数可以每次调用返回最新的状态
const initFormList = configForm => [
  { name: 'usherService', value: configForm.getFieldValue('service'), disabled: true },
  {
    name: 'queryType',
    value: configForm.getFieldValue('queryType'),
    disabled: true,
  },
  {
    name: 'unionId',
    value: configForm.getFieldValue('unionId'),
    hidden: configForm.getFieldValue('queryType') !== 'union',
    disabled: true,
  },
  {
    name: 'corpId',
    value: configForm.getFieldValue('corpId'),
    hidden: configForm.getFieldValue('queryType') !== 'corp',
    disabled: true,
  },
];

const ConfigDetail = () => {
  const { methodId } = useParams();
  const [configForm] = Form.useForm();
  const [requestForm] = Form.useForm();
  const [configFormList, setConfigFormList] = useState(initConfigForm());
  const [serviceList, setServiceList] = useState([]);
  const [requestFormList, setRequestFormList] = useState([
    { name: 'usherService', value: configForm.getFieldValue('service'), disabled: true },
  ]);
  const [result, setResult] = useState({});

  const { loading: detailLoading } = useRequest(() => usherQueryMethodDetail(methodId), {
    onSuccess(res) {
      configForm.setFieldsValue(res?.data);
      onFieldsChange();
    },
  });

  const { loading: updateLoading, run: runConfigUpDate } = useRequest(
    options => usherQueryMethodUpdate(options),
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        message.success('保存成功');
      },
    }
  );

  const { loading: queryLoading, run: runQuery } = useRequest(
    options => testQuery({ ...options, methodId }),
    {
      manual: true,
      onSuccess(res) {
        setResult(res);
      },
      onError(err) {
        setResult(err);
      },
    }
  );

  useRequest(getList, {
    onSuccess(res) {
      setServiceList(res?.data);
      setConfigFormList(initConfigForm(res?.data));
    },
  });
  // 配置表表单发生变化
  const onFieldsChange = () => {
    if (configForm.getFieldValue('queryType') === 'union') {
      setConfigFormList(
        initConfigForm(serviceList).concat({
          label: '医联体ID',
          name: 'unionId',
          placeholder: '请输入医联体ID',
        })
      );
    }
    if (configForm.getFieldValue('queryType') === 'corp') {
      setConfigFormList(
        initConfigForm(serviceList).concat({
          label: '医院ID',
          name: 'corpId',
          placeholder: '请输入医院ID',
        })
      );
    }
    // 将左侧动态表单的值传到右侧
    requestForm.setFields(initFormList(configForm));

    // 去掉重复
    setRequestFormList(val =>
      initFormList(configForm)
        .concat(val)
        .filter((item, index, arr) => index === arr.findIndex(x => x.name === item.name))
    );
  };

  // 入参配置改变
  const onConfigChange = useCallback(
    values => {
      // 将入参配置需要的参数拿到右侧 去掉重复
      setRequestFormList(() =>
        initFormList(configForm)
          .concat(values.map(x => ({ name: x.paramName })))
          .filter((item, index, arr) => index === arr.findIndex(x => x.name === item.name))
      );
    },
    [methodId]
  );

  const onTabChange = activeKey => {};
  return (
    <div className={styles.container}>
      <Spin size="large" spinning={detailLoading || updateLoading}>
        <Row gutter="12">
          <Col span={18}>
            <Card
              title={
                <div className="global-cardTitle">
                  <div>配置信息</div>
                  <Button type="primary" onClick={configForm.submit}>
                    保存配置
                  </Button>
                </div>
              }
            >
              <Form
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                form={configForm}
                onFieldsChange={onFieldsChange}
                validateMessages={{ required: '${label}不能为空' }}
                onFinish={val => runConfigUpDate({ ...val, methodId })}
              >
                <Row>
                  {configFormList.map(x => {
                    return (
                      <Col key={x.name} span={8}>
                        <Form.Item
                          rules={x.partial ? [] : [{ required: true }]}
                          label={x.label}
                          name={x.name}
                        >
                          {x.option ? x.option : <Input placeholder={x.placeholder} />}
                        </Form.Item>
                      </Col>
                    );
                  })}
                </Row>
              </Form>
            </Card>
            <Card style={{ marginTop: 8 }}>
              <Tabs onChange={onTabChange}>
                <Tabs.TabPane tab="入参配置" key="入参配置">
                  <InParameterConfig onConfigChange={onConfigChange} methodId={methodId} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="出参配置" key="出参配置">
                  <OutParameterConfig methodId={methodId} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="异常处理" key="异常处理">
                  <CatchError methodId={methodId} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="替换内容" key="替换内容">
                  <ReplaceContent methodId={methodId} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="过滤条件" key="过滤条件">
                  <FilterEvent methodId={methodId} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="添加字段" key="添加字段">
                  添加字段
                </Tabs.TabPane>
                <Tabs.TabPane tab="卡片配置" key="卡片配置">
                  <CardConfig methodId={methodId} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={6}>
            <div className={styles.right}>
              <Card
                size="small"
                title={
                  <div className="global-cardTitle">
                    <div>请求参数</div>
                    <Button size="small" type="primary" onClick={requestForm.submit}>
                      查询
                    </Button>
                  </div>
                }
              >
                <Form
                  labelCol={{
                    span: 10,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  form={requestForm}
                  // validateMessages={{ required: '${label}不能为空' }}
                  onFinish={val => runQuery(val)}
                >
                  {requestFormList.map(
                    x =>
                      !x.hidden && (
                        <Form.Item
                          // rules={[{ required: true }]}
                          key={x.name}
                          label={x.name}
                          name={x.name}
                        >
                          <Input size="small" disabled={x.disabled} />
                        </Form.Item>
                      )
                  )}
                </Form>
              </Card>
              <Spin spinning={queryLoading}>
                <Card size="small" title="响应结果" style={{ marginTop: 8 }}>
                  <div className={styles.result}>
                    <ReactJson name={false} src={result} indentWidth={2} collapsed={false} />
                  </div>
                </Card>
              </Spin>
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default ConfigDetail;
