import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import InvoiceList from "./InvoiceList";
import DashboardGraphs from "./DashboardGraphs";
export default function List() {
  return (
    <div>
      List Page
      <Routes>
        <Route index element={<InvoiceList />}></Route>
        <Route path="dashboardGraphs" element={<DashboardGraphs />}></Route>
      </Routes>
      <div style={{ color: "red" }}>
        <Outlet />
      </div>
    </div>
  );
}
