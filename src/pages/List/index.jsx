import React, { lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DashboardGraphs from './DashboardGraphs';
const InvoiceList = lazy(() => import('./InvoiceList'));
export default function List() {
  return (
    <div>
      List Page
      <Link to="dashboardGraphs">qwer</Link>
      <Link to="InvoiceList">asdf</Link>
      <Routes>
        <Route index element={<InvoiceList />} />
        <Route path="dashboardGraphs" element={<DashboardGraphs />} />
      </Routes>
    </div>
  );
}
