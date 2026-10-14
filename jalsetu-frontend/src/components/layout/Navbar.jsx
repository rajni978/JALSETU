import { Link, NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import Button from '../ui/Button';

const link = ({ isActive }) => `rounded-lg px-3 py-1.5 transition-colors ${isActive ? 'bg-aqua-50 text-aqua-600' : 'hover:text-aqua-600'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 shadow-card backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex" aria-label="Site">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/how-it-works" className={link}>How it works</NavLink>
        </nav>
        <Button as={Link} to="/dashboard" variant="dark">Open dashboard</Button>
      </div>
    </header>
  );
}