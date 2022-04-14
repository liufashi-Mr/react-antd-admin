import React from "react";
import { Layout as Container } from "antd";
import { useSelector, useDispatch } from "react-redux";
import cls from "classnames";
import styles from "./index.less";
import logo from "@/assets/images/logo512.png";
import MenuList from "@/common/MenuList";
import MixinMenuChild from "@/common/MixinMenuChild";
import { Link } from "react-router-dom";
const { Sider } = Container;
const SideBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed, theme, menuMode } = useSelector(
    (state) => state.SettingModel
  );
  console.log(theme,'theme',menuMode,'menuMode')
  return (
    <>
      {menuMode !== "horizontal" && (
        <Sider
          collapsible
          collapsed={sideBarCollapsed}
          onCollapse={() => dispatch({ type: "setSideBarCollapsed" })}
          className={cls(styles[menuMode],styles[theme], {
            [styles.sideBar]: !sideBarCollapsed,
            [styles.sideBarCollapsed]: sideBarCollapsed,
            [styles.light]: menuMode === "mixin",
          })}
        >
          {menuMode === "inline" && (
            <Link to="/">
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
            </Link>
          )}
          {menuMode === "inline" ? <MenuList /> : <MixinMenuChild />}
        </Sider>
      )}
    </>
  );
};
export default SideBar;
