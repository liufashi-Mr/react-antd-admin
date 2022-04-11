import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
export default function List() {
  return (
    <div>
      List Page

      <div style={{ color: "red" }}>
        <Outlet />
      </div>
    </div>
  );
}
function InvoiceList() {
  return <div>InvoiceList</div>;
}
function DashboardGraphs() {
  return <div>DashboardGraphs</div>;
}
