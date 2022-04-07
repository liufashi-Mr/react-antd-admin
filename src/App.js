import { Provider } from "react-redux";
import store from "./models";
import { Routes, Route, Link, BrowserRouter, Outlet } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./pages/Home";
import Edit from "./pages/EditPage";
import List from "./pages/List";
import Detail from "./pages/ItemDetail";
import NotFound from "./common/404";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" index element={<Home />} />
          <Route path="edit" element={<Edit />} />
          <Route path="list/*" element={<List />} />
          <Route path="detail/:itemId" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
