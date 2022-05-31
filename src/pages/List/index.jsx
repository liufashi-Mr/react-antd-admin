import React, { lazy } from 'react';
import { Outlet, Routes, Route, Link } from 'react-router-dom';
import DashboardGraphs from './DashboardGraphs';
const InvoiceList = lazy(() => import('./InvoiceList'));
export default function List() {
  return (
    <div>
      List Page
      <Link to="dashboardGraphs">qwer</Link>
      <Link to="InvoiceList">asdf</Link>
      <Routes>
        <Route index element={<InvoiceList />}></Route>
        <Route path="dashboardGraphs" element={<DashboardGraphs />}></Route>
      </Routes>
      <div style={{ color: 'red' }}>{/* <Outlet /> */}</div>
    </div>
  );
}
