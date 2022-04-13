import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {insideRoutes} from "@/router";
const { SubMenu, Item } = Menu;

const MenuItem = () => {
  const dispatch = useDispatch();
  const getMenu = (routes, parentPath) => {
    return routes
      .filter((item) => !item.hidden)
      .map((route) =>
        !route.children?.length ? (
          <Item key={parentPath + route.path} icon={route.icon || <></>}>
            <Link
              to={
                parentPath + (route.path.match(/(\S*)\/\*/)
                  ? route.path.match(/(\S*)\/\*/)[1]
                  : route.path)
              }
            >
              {route.title}
            </Link>
          </Item>
        ) : (
          <SubMenu
            title={route.title}
            key={parentPath + route.path}
            icon={route.icon || <></>}
          >
            {getMenu(route.children, parentPath + route.path + "/")}
          </SubMenu>
        )
      );
  };
  const { theme, menuMode } = useSelector((state) => state.SettingModel);
  return (
    <Menu theme={theme} mode={menuMode} defaultSelectedKeys={["1"]}>
      {getMenu(insideRoutes, "")}
    </Menu>
  );
};
export default MenuItem;
