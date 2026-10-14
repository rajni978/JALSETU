import { ThumbsUp } from 'lucide-react';
import Badge from '../ui/Badge';
import { timeAgo } from '../../utils/helpers';

export default function SuggestionCard({ s, areaName, onVote, voted }) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4">
      <button onClick={() => onVote?.(s.id)} disabled={voted || !onVote} aria-label={`Support: ${s.title}`}
        className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl border text-sm font-bold transition-colors ${voted ? 'border-aqua-500 bg-aqua-50 text-aqua-600' : 'border-slate-200 text-slate-600 hover:border-aqua-400'}`}>
        <ThumbsUp size={16} />{s.votes + (voted ? 1 : 0)}
      </button>
      <div className="min-w-0">
        <p className="font-bold text-navy-900">{s.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{areaName} · {s.name} · {timeAgo(s.date)}</p>
        <p className="mt-2 text-sm text-slate-600">{s.description}</p>
        <div className="mt-2"><Badge>{s.category}</Badge></div>
      </div>
    </article>
  );
}