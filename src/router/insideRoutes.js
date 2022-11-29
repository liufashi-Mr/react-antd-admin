import React, { lazy } from 'react';
import { HomeOutlined, TableOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons';

export const insideRoutes = [
  {
    path: '/',
    hidden: true,
    redirect: 'home',
  },
  {
    path: 'home',
    title: '首页',
    meta: { title: '', roles: [] },
    icon: <HomeOutlined />,
    element: lazy(() => import('@/pages/Home')),
  },
  // {
  //   path: 'edit',
  //   title: '编辑页',
  //   meta: { title: '', roles: [] },
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'test',
  //       hidden: true,
  //     },
  //     {
  //       path: 'test',
  //       title: '测试1',
  //       meta: { title: '', roles: [] },
  //       element: lazy(() => import('@/pages/ConfigDetail')),
  //     },
  //     {
  //       path: 'test2',
  //       title: '测试2',
  //       meta: { title: '', roles: [] },
  //       element: lazy(() => import('@/pages/ConfigDetail')),
  //       children: [
  //         {
  //           path: '',
  //           redirect: 'a',
  //           hidden: true,
  //         },
  //         {
  //           path: 'a',
  //           title: '测试a',
  //           meta: { title: '', roles: [] },
  //           element: lazy(() => import('@/pages/ConfigDetail')),
  //         },
  //         {
  //           path: 'b',
  //           title: '测试b',
  //           meta: { title: '', roles: [] },
  //           element: lazy(() => import('@/pages/ConfigDetail')),
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: 'hospitalList',
    title: '机构列表',
    meta: { title: '', roles: [] },
    icon: <TableOutlined />,
    element: lazy(() => import('@/pages/HospitalList')),
  },
  {
    path: 'configDetail/:methodId',
    title: '配置详情',
    meta: { title: '', roles: [] },
    element: lazy(() => import('@/pages/ConfigDetail')),
    hidden: true,
  },
  {
    path: 'formConfig',
    title: '表单配置',
    meta: { title: '', roles: [] },
    icon: <FormOutlined />,
    element: lazy(() => import('@/pages/FormConfig')),
  },
  {
    path: 'settings',
    title: '系统设置',
    meta: { title: '', roles: [] },
    icon: <SettingOutlined />,
    element: lazy(() => import('@/pages/Home')),
  },
  {
    path: '*',
    title: '404',
    meta: { title: '', roles: [] },
    element: lazy(() => import('@/components/common/NotFound')),
    hidden: true,
  },
];
