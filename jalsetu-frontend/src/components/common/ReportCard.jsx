import { MapPin } from 'lucide-react';
import Badge from '../ui/Badge';
import { timeAgo } from '../../utils/helpers';

export default function ReportCard({ r, areaName, footer }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold text-navy-900">{r.category}</p>
        <div className="flex gap-2"><Badge status={r.urgency}>{r.urgency} urgency</Badge><Badge status={r.status} /></div>
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} /> {r.village}{areaName && `, ${areaName}`} · {r.name} · {timeAgo(r.date)}</p>
      <p className="mt-2 text-sm text-slate-600">{r.description}</p>
      {footer && <div className="mt-3">{footer}</div>}
    </article>
  );
}