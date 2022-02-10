import React from "react";
import { Outlet, Routes, Route } from "react-router";
export default function List() {
  return (
    <div>
      List Page
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
function InvoiceList(){
  return <div>InvoiceList</div>
}
function DashboardGraphs(){
  return <div>DashboardGraphs</div>
}
