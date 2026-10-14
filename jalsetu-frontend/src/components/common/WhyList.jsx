import Card from '../ui/Card';
import { levelHex } from '../../utils/helpers';

export default function WhyList({ factors }) {
  const sorted = [...factors].sort((a, b) => b.points - a.points);
  return (
    <Card title="Why is the score like this?">
      <ul className="space-y-5">
        {sorted.map((f) => (
          <li key={f.key}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold text-navy-900">{f.label} <span className="text-xs font-normal text-slate-400">({f.weight}% of score)</span></p>
              <p className="text-sm font-bold" style={{ color: levelHex(f.level) }}>+{f.points} points</p>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{ width: `${f.risk}%`, background: levelHex(f.level) }} />
            </div>
            <p className="mt-1.5 text-xs font-semibold text-slate-500">{f.value}</p>
            <p className="mt-0.5 text-sm text-slate-600">{f.why}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}