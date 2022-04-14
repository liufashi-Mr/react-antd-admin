import { Route, Navigate } from "react-router-dom";
const getRoutes = (routes) => {
  return routes.map((route) =>
    !route.children?.length ? (
      route.redirect ? (
        <Route
          path={route.path}
          key={route.path}
          element={<Navigate to={route.redirect} />}
        />
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      )
    ) : (
      <Route key={route.path} path={route.path}>
        {getRoutes(route.children)}
      </Route>
    )
  );
};
export default getRoutes;
