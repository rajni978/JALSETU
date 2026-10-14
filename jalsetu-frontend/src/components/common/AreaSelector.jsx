import { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { useArea } from '../../context/AreaContext';
import { areaLabel } from '../../utils/helpers';
import Badge from '../ui/Badge';

// Searchable area / state picker. Type a name to filter, click (or press Enter) to select.
export default function AreaSelector() {
  const { areas, area, setAreaId } = useArea();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s ? areas.filter((a) => areaLabel(a).toLowerCase().includes(s)) : areas;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [areas, q]);

  const choose = (a) => {
    setAreaId(a.id);
    setOpen(false);
    setQ('');
  };

  const onKey = (e) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Enter' && matches[0]) {
      e.preventDefault();
      choose(matches[0]);
    }
  };

  return (
    <div className="relative" ref={box}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-card">
        <MapPin size={16} className="text-aqua-600" />
        <span className="text-sm font-semibold text-navy-900">Area</span>
        <span className="max-w-[160px] truncate text-sm font-medium">{area ? areaLabel(area) : 'Select'}</span>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl bg-white p-2 text-left shadow-2xl ring-1 ring-slate-100">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input autoFocus className="input pl-9" placeholder="Search state or area..." value={q}
              onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} aria-label="Search area" />
          </div>
          <ul role="listbox" className="mt-2 max-h-64 overflow-y-auto">
            {matches.map((a) => (
              <li key={a.id} role="option" aria-selected={a.id === area?.id}>
                <button type="button" onClick={() => choose(a)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50 ${a.id === area?.id ? 'bg-aqua-50 font-bold' : ''}`}>
                  <span className="truncate">{areaLabel(a)}</span>
                  <Badge status={a.stress.level}>{a.stress.score}</Badge>
                </button>
              </li>
            ))}
            {matches.length === 0 && <li className="px-3 py-4 text-center text-sm text-slate-500">No area found for “{q}”.</li>}
          </ul>
          <p className="px-3 pb-1 pt-2 text-xs text-slate-400">{areas.length} areas available</p>
        </div>
      )}
    </div>
  );
}