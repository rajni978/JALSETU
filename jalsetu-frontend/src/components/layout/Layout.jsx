import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from '../common/Loader';

// Layout for public pages (Home, About, How it works)
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader text="Loading page..." />}><Outlet /></Suspense>
      </main>
      <Footer />
    </div>
  );
}