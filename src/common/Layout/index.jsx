import React, { useState } from "react";
import { Layout as Container, Button } from "antd";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import styles from "./index.less"
const { Content } = Container;

const Layout = () => {
  return (
    <Container>
      <SideBar />
      <Container className="site-layout">
        <NavBar />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Button type="primary">123</Button>
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
