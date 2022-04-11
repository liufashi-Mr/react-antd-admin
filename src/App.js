import { Provider } from "react-redux";
import store from "./models";
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
import Home from "./pages/Home";
import Edit from "./pages/EditPage";
import List from "./pages/List";
import Detail from "./pages/ItemDetail";
import NotFound from "./common/404";
function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
