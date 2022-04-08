import React, { useState } from "react";
import { Layout as Container, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.common.less";
const { Sider } = Container;

const SideBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed, theme, menuMode } = useSelector(
    (state) => state.SettingModel
  );
  return (
    <Sider
      collapsible
      collapsed={sideBarCollapsed}
      onCollapse={() => dispatch({ type: "setSideBarCollapsed" })}
      className={"sideBar"+ " sideBar-" + menuMode}
    >
      <div className="logo" />
      <Menu theme={theme} mode={"horizontal"} defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SideBar;
