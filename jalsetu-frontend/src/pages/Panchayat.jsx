import { Link } from 'react-router-dom';
import { Gauge, FileWarning, Lightbulb, Hammer } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import useFetch from '../hooks/useFetch';
import { getReports, getSuggestions } from '../services/communityApi';
import { getActions, createAction } from '../services/panchayatApi';
import { computePriority, PRIORITY_RULES } from '../utils/priority';
import { REPORT_TO_INTERVENTION } from '../utils/constants';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaSelector from '../components/common/AreaSelector';
import ReportCard from '../components/common/ReportCard';

export default function Panchayat() {
  const { areas, area, setAreaId, loading: aLoad, error: aErr, reload: aReload } = useArea();
  const { data, loading, error, reload } = useFetch(async () => ({
    reports: await getReports(), suggestions: await getSuggestions(), actions: await getActions(),
  }));

  if (aLoad || loading) return <Loader />;
  if (aErr || error || !area) return <ErrorState message={aErr || error || 'No data'} onRetry={() => { aReload(); reload(); }} />;

  const { reports, suggestions, actions } = data;
  const ranking = areas
    .map((a) => ({ a, p: computePriority(a, reports) }))
    .sort((x, y) => y.p.points - x.p.points);
  const mine = computePriority(area, reports);
  const areaReports = reports.filter((r) => r.areaId === area.id && r.status !== 'Resolved');
  const areaActions = actions.filter((a) => a.areaId === area.id);

  const plan = async (r) => {
    await createAction({
      areaId: r.areaId,
      title: `${REPORT_TO_INTERVENTION[r.category]} – ${r.village}`,
      category: REPORT_TO_INTERVENTION[r.category],
      priority: mine.level,
      reportId: r.id,
      notes: `From community report: ${r.category}.`,
    });
    reload();
  };

  return (
    <>
      <PageHeader title="Panchayat dashboard" subtitle="See which areas need attention first and turn reports into actions.">
        <AreaSelector />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Gauge} label="Priority" value={`${mine.level}`} hint={`${mine.points} points`} tone={mine.level === 'High' ? 'bg-red-50 text-red-500' : mine.level === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'} />
        <StatCard icon={FileWarning} label="Open reports" value={mine.openCount} hint={`${mine.urgentCount} high urgency`} tone="bg-red-50 text-red-500" />
        <StatCard icon={Lightbulb} label="Suggestions" value={suggestions.filter((s) => s.areaId === area.id).length} hint="From the community" tone="bg-amber-50 text-amber-600" />
        <StatCard icon={Hammer} label="Actions" value={areaActions.length} hint={`${areaActions.filter((a) => a.status === 'In Progress').length} in progress`} tone="bg-sky-50 text-sky-600" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Priority ranking (all areas)" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="text-xs text-slate-500">
                <tr className="border-b border-slate-100"><th className="py-2 pr-3">Area</th><th className="pr-3">Water stress</th><th className="pr-3">Open reports</th><th className="pr-3">Points</th><th>Priority</th></tr>
              </thead>
              <tbody>
                {ranking.map(({ a, p }) => (
                  <tr key={a.id} onClick={() => setAreaId(a.id)} className={`cursor-pointer border-b border-slate-50 hover:bg-slate-50 ${a.id === area.id ? 'bg-aqua-50' : ''}`}>
                    <td className="py-3 pr-3 font-bold text-navy-900">{a.name}</td>
                    <td className="pr-3">{a.stress.score} <span className="text-xs text-slate-400">({a.stress.level})</span></td>
                    <td className="pr-3">{p.openCount}</td>
                    <td className="pr-3">{p.points}</td>
                    <td><Badge status={p.level}>{p.level}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title={`How priority is decided in ${area.name}`}>
          <ul className="space-y-2">
            {mine.parts.map((p) => (
              <li key={p.label} className="flex justify-between text-sm"><span>{p.label}</span><b className="text-navy-900">+{p.points}</b></li>
            ))}
            <li className="flex justify-between border-t border-slate-100 pt-2 text-sm font-bold text-navy-900"><span>Total</span><span>{mine.points} · {mine.level}</span></li>
          </ul>
          <ul className="mt-4 list-disc space-y-1 pl-4 text-xs text-slate-500">
            {PRIORITY_RULES.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </Card>
      </div>

      <Card title={`Open reports in ${area.name}`} className="mt-4" action={<Link to="/actions" className="text-xs font-semibold text-aqua-600 hover:underline">Open action tracker</Link>}>
        {areaReports.length === 0
          ? <EmptyState title="No open reports" text="All reports in this area are resolved." />
          : (
            <div className="space-y-3">
              {areaReports.map((r) => (
                <ReportCard key={r.id} r={r}
                  footer={r.status === 'Reported'
                    ? <Button onClick={() => plan(r)} variant="dark" className="!py-1.5">Plan action: {REPORT_TO_INTERVENTION[r.category]}</Button>
                    : <span className="text-xs font-semibold text-cyan-600">Action already planned</span>} />
              ))}
            </div>
          )}
      </Card>
    </>
  );
}