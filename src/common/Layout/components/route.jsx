import React, { Suspense } from "react";
import routes from "@/router";
import { Routes, Route, Navigate } from "react-router-dom";
import { render } from "less";

const RouterMap = () => {
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
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>{getRoutes(routes)}</Routes>
    </Suspense>
  );
};
export default RouterMap;
