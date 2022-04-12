import React, { useState, Suspense, useEffect } from "react";
import { Layout as Container, Drawer } from "antd";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import styles from "./index.less";
import routes from "@/router";
import RouterMap from "./components/route";
import {
  SettingOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import cls from "classnames";
const { Content } = Container;

const Layout = () => {
  const [settingVisible, setSettingVisible] = useState(true);
  const [showSetting, setShowSetting] = useState(true);
  const dispatch = useDispatch();
  const { theme, menuMode } = useSelector((state) => state.SettingModel);
  useEffect(() => {
    setSettingVisible(false);
  }, []);
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
          <RouterMap />
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
            <div className={cls(styles.item, styles.vertical)}>
              <p>主题风格</p>
              <div style={{ display: "flex" }}>
                <div
                  className={styles.dark}
                  onClick={() => dispatch({ type: "setTheme", data: "dark" })}
                >
                  {theme === "dark" && <CheckOutlined />}
                </div>
                <div
                  className={styles.light}
                  onClick={() => dispatch({ type: "setTheme", data: "light" })}
                >
                  {theme === "light" && <CheckOutlined />}
                </div>
              </div>
            </div>
            <div className={cls(styles.item, styles.flex)}></div>
          </Drawer>
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
