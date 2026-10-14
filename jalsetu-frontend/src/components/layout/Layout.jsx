import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const home = useLocation().pathname === '/';
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {home ? <Outlet /> : <div className="mx-auto max-w-6xl px-4 py-8"><Outlet /></div>}
      </main>
      <Footer />
    </div>
  );
}