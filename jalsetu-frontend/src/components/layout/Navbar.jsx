import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import { CITIZEN_LINKS, PANCHAYAT_LINKS, PANCHAYAT_PATHS } from '../../utils/constants';

export default function Navbar() {
  const { pathname } = useLocation();
  const isPanchayat = PANCHAYAT_PATHS.includes(pathname);
  const links = isPanchayat ? PANCHAYAT_LINKS : CITIZEN_LINKS;

  return (
    <header className="sticky top-0 z-30 bg-white/95 shadow-card backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-5 text-sm font-medium md:flex" aria-label="Site">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'text-aqua-600' : 'hover:text-aqua-600')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-aqua-600' : 'hover:text-aqua-600')}>About</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'text-aqua-600' : 'hover:text-aqua-600')}>How it works</NavLink>
        </nav>
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-sm font-semibold">
          <Link to="/dashboard" className={`rounded-md px-3 py-1.5 ${!isPanchayat ? 'bg-navy-800 text-white' : 'text-slate-600'}`}>Citizen</Link>
          <Link to="/panchayat" className={`rounded-md px-3 py-1.5 ${isPanchayat ? 'bg-navy-800 text-white' : 'text-slate-600'}`}>Panchayat</Link>
        </div>
      </div>
      <nav className="border-t border-slate-100 bg-surface" aria-label={isPanchayat ? 'Panchayat' : 'Citizen'}>
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5 [scrollbar-width:none]">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${isActive ? 'bg-white text-navy-900 shadow-card' : 'text-slate-500 hover:text-navy-900'}`}>
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}