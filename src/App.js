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
import RouterMap from "@/common/RouteMap";
function App() {
  return (
    <RouterMap />
  );
}

export default App;
