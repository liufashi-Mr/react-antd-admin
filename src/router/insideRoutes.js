import React, { lazy } from 'react';
import { DashboardOutlined, TableOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons';

export const insideRoutes = [
  {
    path: '/',
    hidden: true,
    redirect: 'home',
  },
  {
    path: 'home',
    title: '分析页',
    icon: <DashboardOutlined />,
    element: lazy(() => import('@/pages/Dashboard')),
  },
  {
    path: 'list',
    title: '列表页',
    icon: <TableOutlined />,
    children: [
      {
        path: '',
        redirect: 'shop-list',
        hidden: true,
      },
      {
        path: 'shop-list',
        title: '医院列表',
        element: lazy(() => import('@/pages/HospitalList')),
      },
      {
        path: 'store-list',
        title: '接口列表',
        element: lazy(() => import('@/pages/HospitalList')),
      },
    ],
  },
  {
    path: 'form',
    title: '表单页',
    icon: <FormOutlined />,
    children: [
      {
        path: 'form-config',
        title: '表单配置',
        element: lazy(() => import('@/pages/FormConfig')),
      },
      {
        path: 'form-all',
        title: '复杂表单页',
        element: lazy(() => import('@/pages/ConfigDetail')),
      },
    ],
  },

  {
    path: 'settings',
    title: '系统设置',
    icon: <SettingOutlined />,
    element: lazy(() => import('@/pages/Settings')),
  },
  {
    path: '*',
    title: '404',
    element: lazy(() => import('@/components/common/NotFound')),
    hidden: true,
  },
];
