import React from "react";
import { Layout as Container } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SettingMenu from "@/components/SettingMenu";
import { Outlet } from "react-router-dom";
const { Content } = Container;

const Layout = ({ loading }) => {
  return (
    <Container>
      <SideBar />
      <Container>
        <NavBar />
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
