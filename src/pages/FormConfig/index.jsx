import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import Generator from 'fr-generator';
import styles from './index.less';
// import CardList from '@/components/CardList';
const FormConfig = () => {
  const schema = {
    type: 'object',
    labelWidth: 120,
    displayType: 'row',
    properties: {
      type: {
        title: '卡片名称',
        type: 'string',
        props: {},
        disabled: true,
        readOnly: false,
        required: false,
        default: '预约挂号-待取号',
      },
      typeCode: {
        title: '卡片id',
        type: 'string',
        enum: ['0', '1'],
        enumNames: ['0', '1'],
        widget: 'select',
        disabled: true,
        default: '0',
      },
      color: {
        title: '背景色',
        type: 'string',
        enum: ['primary', 'warning', 'disabled'],
        enumNames: ['primary', 'warning', 'disabled'],
        widget: 'select',
        default: 'primary',
      },
      reminder: { title: '提示语', type: 'string', props: {} },
      header: {
        title: '顶部内容',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { title: '字段', type: 'string' },
            fieldDesc: { title: '字段描述', type: 'string', props: {} },
            style: { title: '样式', type: 'string', props: {} },
          },
        },
        props: {},
        description: '',
        default: [
          { field: 'patientName', style: '{}' },
          { field: 'appoNo', fieldDesc: '就诊号[]号', style: '{}' },
        ],
      },
      content: {
        title: '内容区域',
        type: 'object',
        properties: {
          title: {
            title: '内容标题',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { title: '字段', type: 'string' },
                fieldDesc: { title: '字段描述', type: 'string', props: {} },
                style: { title: '样式', type: 'string', props: {} },
              },
            },
            default: [
              { field: 'medDate', render: 'getDateDesc', style: '{}' },
              { field: 'medAmPm', render: 'getAmPm', style: '{}' },
              { field: 'medBegtime', fieldDesc: '[]到院就诊', style: '{}' },
            ],
          },
          subtitle: {
            title: '显示内容',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { title: '字段', type: 'string' },
                fieldDesc: { title: '字段描述', type: 'string', props: {} },
                style: { title: '样式', type: 'string', props: {} },
              },
            },
            default: [
              { field: 'address', fieldDesc: '就诊地址：', style: '{}' },
              { field: 'deptName', fieldDesc: '就诊门诊：', style: '{}' },
            ],
          },
        },
      },
      footer: {
        title: '底部内容',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            target: {
              title: '跳转方式',
              type: 'string',
              enum: ['_self', '_blank'],
              enumNames: ['本页跳转', '新开页面'],
              widget: 'select',
            },
            text: { title: '按钮名称', type: 'string', props: {} },
            color: {
              title: '按钮颜色',
              type: 'string',
              enum: ['primary', 'disabled', 'warning', 'default'],
              enumNames: ['primary', 'disabled', 'warning', 'default'],
              widget: 'select',
            },
            href: { title: '跳转链接', type: 'string', props: {} },
          },
        },
        default: [
          {
            text: '挂号详情',
            color: 'primary',
            href: 'https://guahao-jkqd.yuantutech.com/#/index?transferKey=33&corpId=261&unionId=29&id=${dataMap.orderNo}',
            target: '_self',
          },
        ],
        props: {},
      },
    },
  };
  return (
    <Card
      title={
        <div className="global-cardTitle">
          <div>表单配置</div>
          <Button
            type="primary"
            href="https://xrender.fun/generator#%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA"
            target="_blank"
          >
            保存
          </Button>
        </div>
      }
    >
      <div className={styles.container}>
        {/* <div className={styles.cardList}>
          <CardList />
        </div> */}
        <div className={styles.form}>
          <Generator defaultValue={schema} />
        </div>
      </div>
    </Card>
  );
};

export default FormConfig;
