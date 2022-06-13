import React from 'react';
import { Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { insideRoutes } from '@/router';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '@/hooks';
const MixinMenuHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedKeys = useMenu();
  const { theme } = useSelector(state => state.SettingModel);
  const getHeaderMenu = (routes, parentPath) => {
    return routes
      .filter(item => !item.hidden)
      .map(route =>
        !route.children?.length ? (
          <Menu.Item
            key={
              parentPath +
              (route.path.match(/(\S*)\/\*/) ? route.path.match(/(\S*)\/\*/)[1] : route.path)
            }
            icon={route.icon || <></>}
            onClick={() => {
              navigate(
                parentPath +
                  (route.path.match(/(\S*)\/\*/) ? route.path.match(/(\S*)\/\*/)[1] : route.path)
              );
              dispatch({ type: 'setMixinMenuActivePath', data: route.path });
            }}
          >
            {route.title}
          </Menu.Item>
        ) : (
          <Menu.Item
            key={parentPath + route.path}
            icon={route.icon || <></>}
            onClick={() => {
              dispatch({ type: 'setMixinMenuActivePath', data: route.path });
            }}
          >
            {route.title}
          </Menu.Item>
        )
      );
  };

  return (
    <Menu theme={theme} mode="horizontal" selectedKeys={selectedKeys}>
      {getHeaderMenu(insideRoutes, '/')}
    </Menu>
  );
};
export default MixinMenuHeader;
