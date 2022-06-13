import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/common/Layout';
import getRoutes from '@/common/RouteMap';
import { outsideRoutes } from '@/router';
import RouteLoading from './common/RouteLoading';
function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/*" element={<Layout />} />
        {getRoutes(outsideRoutes)}
      </Routes>
    </Suspense>
  );
}

export default App;
