import React, { useState, Suspense } from "react";
import { Layout as Container, Drawer } from "antd";
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import styles from "./index.less";
import routes from "@/router";
import { SettingOutlined, CloseOutlined } from "@ant-design/icons";
import { closeSync } from "fs-extra";
const { Content } = Container;

const Layout = () => {
  const [settingVisible, setSettingVisible] = useState(true);
  const [showSetting, setShowSetting] = useState(true);

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
          <Suspense fallback={<div>loading</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={route.path}
                ></Route>
              ))}
            </Routes>
          </Suspense>
          <Drawer
            closable={false}
            visible={settingVisible}
            width={300}
            className={styles.container}
          >
            <div
              className={styles.setting}
              onClick={() => setSettingVisible((val) => !val)}
            >
              {settingVisible ? <CloseOutlined /> : <SettingOutlined />}
            </div>
            <div className={closeSync(styles.item, styles.vertical)}>
              <p>主题风格</p>
              <div>
                <div className={styles.light}></div>
                <div className={styles.dark}></div>
              </div>
            </div>
            <div className={closeSync(styles.item, styles.flex)}></div>
          </Drawer>
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
