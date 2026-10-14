import { Check } from 'lucide-react';
import { ACTION_STATUSES } from '../../utils/constants';

export default function StatusStepper({ status }) {
  const current = ACTION_STATUSES.indexOf(status);
  return (
    <ol className="flex items-center">
      {ACTION_STATUSES.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s} className="flex flex-1 items-center last:flex-none">
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? 'bg-aqua-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {done ? <Check size={13} /> : i + 1}
            </span>
            <span className={`ml-2 text-xs font-semibold ${done ? 'text-navy-900' : 'text-slate-400'}`}>{s}</span>
            {i < ACTION_STATUSES.length - 1 && <span className={`mx-3 h-0.5 flex-1 rounded ${i < current ? 'bg-aqua-600' : 'bg-slate-200'}`} />}
          </li>
        );
      })}
    </ol>
  );
}