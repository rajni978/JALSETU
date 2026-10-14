import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import useFetch from '../hooks/useFetch';
import { getMonitoring, getActions } from '../services/panchayatApi';
import { formatDate } from '../utils/helpers';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaSelector from '../components/common/AreaSelector';

function ResultCard({ m }) {
  const change = ((m.after - m.before) / m.before) * 100;
  const better = m.lowerIsBetter ? m.after < m.before : m.after > m.before;
  const max = Math.max(m.before, m.after);
  const Icon = m.after < m.before ? TrendingDown : TrendingUp;
  return (
    <Card>
      <p className="text-sm font-bold text-navy-900">{m.metric}</p>
      <p className="text-xs text-slate-500">{m.actionTitle} · {m.unit} · {formatDate(m.date)}</p>
      <div className="mt-4 space-y-2">
        {[['Before', m.before, 'bg-slate-300'], ['After', m.after, better ? 'bg-emerald-500' : 'bg-red-400']].map(([l, v, c]) => (
          <div key={l} className="flex items-center gap-3 text-xs">
            <span className="w-11 text-slate-500">{l}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${c}`} style={{ width: `${(v / max) * 100}%` }} /></div>
            <span className="w-24 text-right font-bold text-navy-900">{v}</span>
          </div>
        ))}
      </div>
      <p className={`mt-3 flex items-center gap-1 text-sm font-bold ${better ? 'text-emerald-600' : 'text-red-500'}`}>
        <Icon size={16} /> {Math.abs(change).toFixed(0)}% {m.after < m.before ? 'lower' : 'higher'} · {better ? 'Improved' : 'Needs attention'}
      </p>
    </Card>
  );
}

export default function Monitoring() {
  const { area, loading: aLoad } = useArea();
  const { data, loading, error, reload } = useFetch(
    async () => ({ items: await getMonitoring(area.id), actions: await getActions() }),
    [area?.id]
  );

  if (aLoad || !area || loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const done = data.actions.filter((a) => a.areaId === area.id && a.status === 'Resolved');
  const inProgress = data.actions.filter((a) => a.areaId === area.id && a.status !== 'Resolved');

  return (
    <>
      <PageHeader title="Monitoring" subtitle="Did the work help? Before and after numbers for completed actions.">
        <AreaSelector />
      </PageHeader>

      {data.items.length === 0 ? (
        <EmptyState title={`No results measured in ${area.name} yet`} text="Results appear here after an action is resolved and its effect is measured." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.items.map((m) => <ResultCard key={m.id} m={m} />)}</div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card title="Resolved actions">
          {done.length ? <ul className="space-y-2">{done.map((a) => <li key={a.id} className="flex items-center justify-between text-sm"><span>{a.title}</span><Badge status="Resolved" /></li>)}</ul> : <p className="text-sm text-slate-500">None yet.</p>}
        </Card>
        <Card title="Waiting to be measured">
          {inProgress.length ? <ul className="space-y-2">{inProgress.map((a) => <li key={a.id} className="flex items-center justify-between gap-2 text-sm"><span>{a.title}</span><span className="flex items-center gap-1 text-xs text-slate-500"><Badge status={a.status} /><ArrowRight size={12} />Resolved</span></li>)}</ul> : <p className="text-sm text-slate-500">No open actions in this area.</p>}
        </Card>
      </div>
    </>
  );
}