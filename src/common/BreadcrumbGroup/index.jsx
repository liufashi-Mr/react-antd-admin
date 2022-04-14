import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { insideRoutes } from "@/router";
const BreadcrumbGroup = () => {
  const location = useLocation();
  console.log(location);
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {/* <Link to={url}>{breadcrumbNameMap[url]}</Link> */}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return <></>
};
export default BreadcrumbGroup;
