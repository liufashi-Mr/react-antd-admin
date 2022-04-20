import { lazy } from "react";
export const outsideRoutes = [
  {
    path: "/login",
    title: "登录",
    meta: { title: "", roles: [] },
    component: lazy(() => import("@/pages/Login")),
  },
];
