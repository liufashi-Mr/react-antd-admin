import { lazy } from 'react';
export const outsideRoutes = [
  {
    path: '/login',
    title: '登录',
    meta: { title: '', roles: [] },
    element: lazy(() => import('@/pages/Login')),
  },
];
