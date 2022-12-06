import React from 'react';
import { Layout as Container } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import cls from 'classnames';
import styles from './index.less';
import logo from '@/assets/images/logo.png';
import MenuList from '@/components/common/MenuList';
import MixinMenuChild from '@/components/common/MixinMenuChild';
import { Link } from 'react-router-dom';
const { Sider } = Container;
const SideBar = () => {
  const dispatch = useDispatch();
  const { sideBarCollapsed, theme, menuMode, sideBarHidden } = useSelector(
    state => state.SettingReducer
  );
  return (
    <>
      {menuMode !== 'horizontal' && (
        <Sider
          collapsible
          collapsed={sideBarCollapsed}
          onCollapse={() => dispatch({ type: 'setSideBarCollapsed' })}
          className={cls(styles[menuMode], styles[theme], {
            [styles.sideBar]: !sideBarCollapsed,
            [styles.sideBarCollapsed]: sideBarCollapsed,
            [styles.light]: menuMode === 'mixin',
            [styles.sideBarHidden]: sideBarHidden && menuMode === 'mixin',
          })}
        >
          {menuMode === 'inline' && (
            <Link to="/">
              <div
                className={cls(styles.logo, {
                  [styles.logoCollapsed]: sideBarCollapsed,
                })}
              >
                <img src={logo} alt="logo" />
                {!sideBarCollapsed && <span className={styles[theme]}>react-admin</span>}
              </div>
            </Link>
          )}
          {menuMode === 'inline' ? <MenuList /> : <MixinMenuChild />}
        </Sider>
      )}
    </>
  );
};
export default SideBar;
