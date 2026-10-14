import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import WhatCanIDo from './pages/WhatCanIDo';
import ReportProblem from './pages/ReportProblem';
import Community from './pages/Community';
import Panchayat from './pages/Panchayat';
import ActionTracker from './pages/ActionTracker';
import Monitoring from './pages/Monitoring';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/what-can-i-do" element={<WhatCanIDo />} />
          <Route path="/report" element={<ReportProblem />} />
          <Route path="/community" element={<Community />} />
          <Route path="/panchayat" element={<Panchayat />} />
          <Route path="/actions" element={<ActionTracker />} />
          <Route path="/monitoring" element={<Monitoring />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}