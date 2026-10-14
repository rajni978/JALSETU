import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// Layout for all app pages: navy sidebar + top bar (like the design mockup)
export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="p-4 lg:p-8">
          <div key={pathname} className="mx-auto max-w-7xl animate-fade-up"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}