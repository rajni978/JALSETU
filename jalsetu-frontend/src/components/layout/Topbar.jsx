import { Menu, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TITLES = {
  '/dashboard': 'Dashboard',
  '/map': 'Water map',
  '/what-can-i-do': 'What can I do?',
  '/report': 'Report a problem',
  '/community': 'Community',
  '/panchayat': 'Panchayat dashboard',
  '/actions': 'Action tracker',
  '/monitoring': 'Monitoring',
};

export default function Topbar({ onMenu }) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-100 bg-white/80 px-4 py-3 backdrop-blur lg:px-8">
      <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <p className="text-sm font-semibold text-slate-500">
        JALSETU <span className="mx-1 text-slate-300">/</span> <span className="text-navy-900">{TITLES[pathname] || ''}</span>
      </p>
      <Link to="/" className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-navy-800 hover:bg-slate-100">
        <Home size={16} /> Website
      </Link>
    </header>
  );
}