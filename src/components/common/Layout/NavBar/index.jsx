import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout as Container, Switch, Avatar, Dropdown, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import MenuList from '@/components/common/MenuList';
import MixinMenuHeader from '@/components/common/MixinMenuHeader';
import styles from './index.less';
import logo from '@/assets/images/logo.png';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';
import BreadcrumbGroup from '@/components/common/BreadcrumbGroup';
const { Header } = Container;
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sideBarCollapsed, theme, menuMode } = useSelector(state => state.SettingReducer);
  return (
    <Header
      className={cls(styles.navBar, styles[menuMode], {
        [styles[theme]]: menuMode !== 'inline',
        [styles.navBarCollapsed]: sideBarCollapsed,
      })}
    >
      <div className={styles.navHeader}>
        {menuMode !== 'inline' ? (
          <div className={styles.left}>
            <div className={styles.logo} onClick={() => navigate('/')}>
              <img src={logo} alt="logo" />
              <span
                className={cls({
                  [styles[theme]]: menuMode !== 'inline',
                })}
              >
                Hangzhou Ma
              </span>
            </div>
            <div className={styles.menu}>
              {menuMode === 'horizontal' ? <MenuList /> : <MixinMenuHeader />}
            </div>
          </div>
        ) : (
          <div className={styles.inlineLeft}>
            {React.createElement(sideBarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => dispatch({ type: 'setSideBarCollapsed' }),
            })}
            <BreadcrumbGroup />
          </div>
        )}
        <div
          className={cls(styles.right, {
            [styles[theme]]: menuMode !== 'inline',
            [styles.light]: menuMode === 'inline',
          })}
        >
          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={'exit'}>退出</Menu.Item>
                </Menu>
              }
            >
              <div>
                <Avatar size={28} style={{ backgroundColor: '#6137b2', marginRight: 8 }}>
                  Ma
                </Avatar>
                <span>Hangzhou Ma</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};
export default NavBar;
