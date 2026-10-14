import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Map, Lightbulb, Megaphone, Users, Landmark, ClipboardList, LineChart, Home, X } from 'lucide-react';
import Logo from '../common/Logo';
import { TAGLINE } from '../../utils/constants';

const GROUPS = [
  {
    title: 'Citizen',
    links: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/map', label: 'Water map', icon: Map },
      { to: '/what-can-i-do', label: 'What can I do?', icon: Lightbulb },
      { to: '/report', label: 'Report a problem', icon: Megaphone },
      { to: '/community', label: 'Community', icon: Users },
    ],
  },
  {
    title: 'Panchayat',
    links: [
      { to: '/panchayat', label: 'Panchayat dashboard', icon: Landmark },
      { to: '/actions', label: 'Action tracker', icon: ClipboardList },
      { to: '/monitoring', label: 'Monitoring', icon: LineChart },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-navy-950/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950 p-4 text-white transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-6 mt-1 flex items-center justify-between px-2">
          <Link to="/" onClick={onClose}><Logo light /></Link>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-white/10 lg:hidden" aria-label="Close menu"><X size={18} /></button>
        </div>

        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-sky-200/50">{g.title}</p>
              <div className="space-y-1">
                {g.links.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} onClick={onClose}
                    className={({ isActive }) => `group flex items-center gap-3 rounded-xl border-l-4 px-3 py-2.5 text-sm font-semibold transition-all ${isActive ? 'border-aqua-400 bg-white/15 text-white' : 'border-transparent text-sky-100/70 hover:bg-white/10 hover:text-white'}`}>
                    <Icon size={18} className="transition-transform group-hover:scale-110" /> {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-aqua-600/40 to-white/5 p-4 text-xs text-sky-100/90 ring-1 ring-white/10">
          <GlowDot />
          <p className="mt-2 font-semibold">{TAGLINE}</p>
          <Link to="/" onClick={onClose} className="mt-3 inline-flex items-center gap-1.5 font-bold text-white hover:underline"><Home size={13} /> Back to website</Link>
        </div>
      </aside>
    </>
  );
}

function GlowDot() {
  return <span className="inline-block h-2.5 w-2.5 animate-float rounded-full bg-aqua-400 shadow-[0_0_12px_#2cc4dc]" />;
}