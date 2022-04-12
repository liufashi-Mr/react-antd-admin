import React from "react";
import { Layout as Container, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cls from "classnames";
import routes from "@/router";
import styles from "./index.less";
import logo from "@/assets/images/logo512.png";
import MenuItem from "../components/MenuItem";
const { Sider } = Container;
const { SubMenu, ItemGroup, Item } = Menu;
const SideBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed, theme, menuMode } = useSelector(
    (state) => state.SettingModel
  );
  return (
    <>
      {menuMode !== "horizontal" && (
        <Sider
          collapsible
          collapsed={sideBarCollapsed}
          onCollapse={() => dispatch({ type: "setSideBarCollapsed" })}
          className={cls(styles[menuMode], [styles[theme]], {
            [styles.sideBar]: !sideBarCollapsed,
            [styles.sideBarCollapsed]: sideBarCollapsed,
          })}
        >
          <div
            className={cls(styles.logo, {
              [styles.logoCollapsed]: sideBarCollapsed,
            })}
          >
            <img src={logo} alt="logo" />
            {!sideBarCollapsed && (
              <span className={styles[theme]}>React admin</span>
            )}
          </div>
          <MenuItem />
        </Sider>
      )}
    </>
  );
};
export default SideBar;
