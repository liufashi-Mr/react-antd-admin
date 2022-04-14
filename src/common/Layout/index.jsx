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
const { Content } = Container;

const Layout = () => {
  const { menuMode } = useSelector((state) => state.SettingModel);
  return (
    <Container>
      {menuMode === "inline" ? <SideBar /> : <NavBar />}
      <Container>
        {menuMode === "inline" ? <NavBar /> : <SideBar />}
        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 48px )",
          }}
        >
          <SettingMenu />
          <Suspense fallback={ <RouteLoading/> } >
            <Routes>{getRoutes(insideRoutes)}</Routes>
          </Suspense>
          <BreadcrumbGroup />
          <Outlet />
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
