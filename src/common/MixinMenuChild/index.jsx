import React from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { insideRoutes } from "@/router";
const { SubMenu } = Menu;

const MixinMenuChild = () => {
  const { theme, mixinMenuActivePath } = useSelector(
    (state) => state.SettingModel
  );
  const getChildMenu = (routes, parentPath) => {
    return routes
      .filter((item) => !item.hidden)
      .map((route) =>
        !route.children?.length ? (
          <Menu.Item key={parentPath + route.path} icon={route.icon || <></>}>
            <Link
              to={
                parentPath +
                (route.path.match(/(\S*)\/\*/)
                  ? route.path.match(/(\S*)\/\*/)[1]
                  : route.path)
              }
            >
              {route.title}
            </Link>
          </Menu.Item>
        ) : (
          <SubMenu
            title={route.title}
            key={parentPath + route.path}
            icon={route.icon || <></>}
          >
            {getChildMenu(route.children, parentPath + route.path + "/")}
          </SubMenu>
        )
      );
  };

  return (
    <Menu theme={theme} mode="inline" defaultSelectedKeys={["1"]}>
      {getChildMenu(
        insideRoutes[
          insideRoutes.findIndex((item) => item.path === mixinMenuActivePath)
        ]?.children || [],
        mixinMenuActivePath + "/"
      )}
    </Menu>
  );
};
export default MixinMenuChild;
