import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import routes from "@/router";
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
      {getMenu(routes, "")}
      {/* {routes
        .filter((item) => !item.hidden)
        .map((route) =>
          route.children?.length ? (
            <SubMenu title={route.title} key={route.path} icon={route.icon}>
              {route.children
                .filter((item) => !item.hidden)
                .map((child) => (
                  <Item key={`${route.path}/${child.path}`} icon={child.icon}>
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
        )} */}
    </Menu>
  );
};
export default MenuItem;
