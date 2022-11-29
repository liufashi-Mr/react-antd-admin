import { Route, Navigate } from 'react-router-dom';
export const getRoutes = routes => {
  return routes
    .filter(route => !route.redirect)
    .map(route =>
      !route.children?.length ? (
        route.index ? (
          <Route index key={route.path || route.redirect} element={<route.element />} />
        ) : (
          <Route key={route.path} path={route.path} element={<route.element />} />
        )
      ) : (
        <Route key={route.path} path={route.path}>
          {getRoutes(route.children)}
        </Route>
      )
    );
};
// 将重定向路由和正常分开，解决重定向和动画导致的无限渲染问题
export const getNavigateRoutes = routes => {
  return routes.map(route =>
    !route.children?.length ? (
      route.redirect ? (
        <Route path={route.path} key={route.path} element={<Navigate to={route.redirect} />} />
      ) : null
    ) : (
      <Route key={route.path} path={route.path}>
        {getNavigateRoutes(route.children)}
      </Route>
    )
  );
};
