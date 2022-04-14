import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout as Container } from "antd";
import { useSelector, useDispatch } from "react-redux";
import MenuList from "@/common/MenuList";
import MixinMenuHeader from "@/common/MixinMenuHeader";
import styles from "./index.less";
import logo from "@/assets/images/logo512.png";
import cls from "classnames";
const { Header } = Container;
const NavBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed, theme, menuMode } = useSelector(
    (state) => state.SettingModel
  );
  return (
    <Header
      className={cls(styles.navBar, {
        [styles[theme]]: menuMode === "horizontal",
        [styles.mixin]: menuMode === "mixin",
      })}
    >
      <div className={styles.navHeader}>
        {menuMode !== "inline" ? (
          <div className={styles.left}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              <span
                className={cls({
                  [styles[theme]]: menuMode === "horizontal",
                  [styles.mixin]: menuMode === "mixin"
                })}
              >
                React admin
              </span>
            </div>
            <div className={styles.menu}>
              {menuMode === "horizontal" ? <MenuList /> : <MixinMenuHeader />}
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 16, flex: "1 1 0%" }}>
            {React.createElement(
              sideBarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => dispatch({ type: "setSideBarCollapsed" }),
              }
            )}
          </div>
        )}
        <div className={styles.right}>otherInfo</div>
      </div>
    </Header>
  );
};
export default NavBar;
