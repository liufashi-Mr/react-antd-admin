import  { Suspense } from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  Outlet,
  // Redirect,
} from "react-router-dom";
import "./index.common.less";
import Layout from "./common/Layout";
import RouterMap from "./common/Layout/components/RouteMap";
function App() {
  return (
    <RouterMap />
  );
}

export default App;
