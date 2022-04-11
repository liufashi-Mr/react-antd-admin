import React, { useEffect, useState } from "react";
import { Layout as Container, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cls from "classnames";
import routes from "@/router";
import styles from "./index.less";
import logo from "@/assets/images/logo512.png";
const { Sider } = Container;
const { SubMenu, ItemGroup, Item } = Menu;
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

        <Menu theme={theme} mode={menuMode} defaultSelectedKeys={["1"]}>
          {routes
            .filter((item) => !item.hidden)
            .map((route) =>
              route.children?.length ? (
                <SubMenu title={route.title} key={route.path} icon={route.icon}>
                  {route.children
                    .filter((item) => !item.hidden)
                    .map((child) => (
                      <Item
                        key={`${route.path}/${child.path}`}
                        icon={child.icon}
                      >
                        <Link to={`${route.path}/${child.path}`}>
                          {child.title}
                        </Link>
                      </Item>
                    ))}
                </SubMenu>
              ) : (
                <Item key={route.path} icon={route.icon}>
                  <Link to={`${route.path}`}>{route.title}</Link>
                </Item>
              )
            )}
        </Menu>
      </Sider>
  );
};
export default SideBar;
