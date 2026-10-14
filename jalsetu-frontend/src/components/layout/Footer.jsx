import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { TAGLINE } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="mt-12 bg-navy-900 text-sky-100/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6 px-4 py-8 text-sm">
        <div>
          <Logo light />
          <p className="mt-2 max-w-xs">{TAGLINE}</p>
        </div>
        <div className="flex gap-8">
          <div className="space-y-1.5">
            <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
            <Link to="/map" className="block hover:text-white">Map</Link>
            <Link to="/report" className="block hover:text-white">Report a problem</Link>
          </div>
          <div className="space-y-1.5">
            <Link to="/about" className="block hover:text-white">About</Link>
            <Link to="/how-it-works" className="block hover:text-white">How it works</Link>
            <Link to="/panchayat" className="block hover:text-white">For Panchayat</Link>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-3 text-center text-xs text-sky-100/60">Figures shown are sample data for the project demo.</p>
    </footer>
  );
}