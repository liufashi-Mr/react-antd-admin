import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { insideRoutes } from "@/router";
const { SubMenu } = Menu;

const MixinMenuChild = () => {
  const { mixinMenuActivePath } = useSelector(
    (state) => state.SettingModel
  );
  const [childMenuList, setChildMenuList] = useState([]);
  useEffect(() => {
    setChildMenuList(
      insideRoutes[
        insideRoutes.findIndex((item) => item.path === mixinMenuActivePath)
      ]?.children || []
    );
  }, [mixinMenuActivePath]);
  useEffect(() => {
    dispatch({ type: "serSideBarHidden", data: !childMenuList.length });
  }, [childMenuList]);
  const dispatch = useDispatch();
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
    <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
      {getChildMenu(childMenuList, mixinMenuActivePath + "/")}
    </Menu>
  );
};
export default MixinMenuChild;