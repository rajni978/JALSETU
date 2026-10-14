import { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';

// Lazy pages: each one is downloaded only when the user opens it
const About = lazy(() => import('./pages/About'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MapView = lazy(() => import('./pages/MapView'));
const WhatCanIDo = lazy(() => import('./pages/WhatCanIDo'));
const ReportProblem = lazy(() => import('./pages/ReportProblem'));
const Community = lazy(() => import('./pages/Community'));
const Panchayat = lazy(() => import('./pages/Panchayat'));
const ActionTracker = lazy(() => import('./pages/ActionTracker'));
const Monitoring = lazy(() => import('./pages/Monitoring'));
const NotFound = lazy(() => import('./pages/NotFound'));

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