import React from "react";
import { Layout as Container } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SettingMenu from "@/components/SettingMenu";
const { Content } = Container;

const Layout = () => {
  return (
    <Container>
      <SideBar />
      <Container className="site-layout">
        <NavBar />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <SettingMenu />
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
