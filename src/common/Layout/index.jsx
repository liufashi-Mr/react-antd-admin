import React, { Suspense } from "react";
import { Layout as Container } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SettingMenu from "@/common/SettingMenu";
import { Outlet, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { insideRoutes } from "@/router";
import RouteLoading from "../RouteLoading";
import getRoutes from "../RouteMap";
import BreadcrumbGroup from "../BreadcrumbGroup";
import styles from "./index.less";
const { Content } = Container;

const Layout = () => {
  const { menuMode } = useSelector((state) => state.SettingModel);
  return (
    <Container>
      {menuMode === "inline" ? <SideBar /> : <NavBar />}
      <Container>
        {menuMode === "inline" ? <NavBar /> : <SideBar />}
        <Content style={{ padding: "12px 16px 16px",height:"calc( 100vh - 48px)",overflowY:"scroll"}}>
          {menuMode !== "inline" && (
            <div className={styles.breadcrumb}>
              <BreadcrumbGroup />
            </div>
          )}
          <div className={styles.content}>
            <Suspense fallback={<RouteLoading />}>
              <Routes>{getRoutes(insideRoutes)}</Routes>
            </Suspense>
            <Outlet />
          </div>
          <SettingMenu />
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
