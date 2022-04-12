import React, { Suspense } from "react";
import routes from "@/router";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "..";
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
      <Routes>
        <Route path="/" element={<Layout/>}>{getRoutes(routes)}</Route>
      </Routes>
    </Suspense>
  );
};
export default RouterMap;
