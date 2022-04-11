import { lazy } from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const routes = [
  {
    path: "/home",
    title: "首页",
    meta: { title: "", roles: [] },
    icon: <UserOutlined />,
    component: lazy(() => import("@/pages/Home")),
  },
  {
    path: "/edit",
    title: "编辑页",
    meta: { title: "", roles: [] },
    icon: <UserOutlined />,
    component: lazy(() => import("@/pages/EditPage")),
  },
  {
    path: "/list",
    title: "列表",
    meta: { title: "", roles: [] },
    icon: <UserOutlined />,
    component: lazy(() => import("@/pages/List")),
    children: [
      {
        path: "test",
        title: "列表测试1",
        meta: { title: "", roles: [] },
        icon: <UserOutlined />,
        component: lazy(() => import("@/pages/List/DashboardGraphs")),
      },
      {
        path: "test2",
        title: "列表测试2",
        meta: { title: "", roles: [] },
        icon: <UserOutlined />,
        component: lazy(() => import("@/pages/List/InvoiceList")),
      },
    ],
  },
  {
    path: "/detail/:itemId",
    title: "详情",
    meta: { title: "", roles: [] },
    icon: <UserOutlined />,
    component: lazy(() => import("@/pages/ItemDetail")),
    hidden: true,
  },
];

export default routes;
