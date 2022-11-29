import React, { Suspense, useRef } from 'react';
import { Layout as Container } from 'antd';
import SideBar from './SideBar';
import NavBar from './NavBar';
import SettingMenu from '@/components/common/SettingMenu';
import { Outlet, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { insideRoutes } from '@/router';
import RouteLoading from '../RouteLoading';
import { getRoutes, getNavigateRoutes } from '../RouteMap';
import BreadcrumbGroup from '../BreadcrumbGroup';
import styles from './index.less';
import cls from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
const { Content } = Container;
const Layout = () => {
  const location = useLocation();
  const container = useRef(null);
  const { menuMode } = useSelector(state => state.SettingReducer);
  return (
    <Container>
      {menuMode === 'inline' ? <SideBar /> : <NavBar />}
      <Container className={cls({ [styles.inline]: menuMode === 'inline' })}>
        {menuMode === 'inline' ? <NavBar /> : <SideBar />}
        <Content
          className={cls({ [styles.mixin]: menuMode === 'mixin' })}
          style={{ padding: '60px 16px 16px' }}
        >
          {menuMode !== 'inline' && (
            <div className={styles.breadcrumb}>
              <BreadcrumbGroup />
            </div>
          )}
          <Suspense fallback={<RouteLoading />}>
            <div className={styles.content} ref={container}>
              <Routes>{getNavigateRoutes(insideRoutes)}</Routes>
              <SwitchTransition>
                <CSSTransition
                  appear
                  timeout={500}
                  classNames="page-transition"
                  unmountOnExit
                  nodeRef={container}
                  key={location.pathname}
                >
                  <Routes location={location}>{getRoutes(insideRoutes)}</Routes>
                </CSSTransition>
              </SwitchTransition>
              <Outlet />
            </div>
          </Suspense>
          <SettingMenu />
        </Content>
      </Container>
    </Container>
  );
};
export default Layout;
