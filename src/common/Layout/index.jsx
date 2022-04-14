import React from "react";
import { Layout as Container } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SettingMenu from "@/common/SettingMenu";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const { Content } = Container;

const Layout = () => {
  const { menuMode } = useSelector((state) => state.SettingModel);
  return (
    <Container>
      {menuMode === "inline" ? <SideBar /> :<NavBar /> }
      <Container>
      {menuMode === "inline" ? <NavBar /> : <SideBar />}
        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 48px )",
          }}
        >
          <SettingMenu />
          <Outlet />
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
