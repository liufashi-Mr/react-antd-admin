import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout as Container } from "antd";
import { useSelector, useDispatch } from "react-redux";
const { Header } = Container;
const NavBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed } = useSelector((state) => state.SettingModel);
  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, background: "#fff" }}
    >
      {React.createElement(
        sideBarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => dispatch({ type: "setSideBarCollapsed" }),
        }
      )}
    </Header>
  );
};
export default NavBar;
