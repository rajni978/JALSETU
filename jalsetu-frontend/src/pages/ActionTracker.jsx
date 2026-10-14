import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import useFetch from '../hooks/useFetch';
import { getActions, createAction, updateActionStatus } from '../services/panchayatApi';
import { validateAction } from '../utils/validators';
import { ACTION_STATUSES, INTERVENTION_CATEGORIES, URGENCY_LEVELS } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import Tabs from '../components/ui/Tabs';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import StatusStepper from '../components/common/StatusStepper';

export default function ActionTracker() {
  const { areas, areaId } = useArea();
  const { data, loading, error, reload } = useFetch(getActions);
  const [tab, setTab] = useState('all');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ areaId, title: '', category: '', priority: 'Medium', notes: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const areaName = (id) => areas.find((a) => a.id === id)?.name || '';
  const scoped = data.filter((a) => filter === 'all' || a.areaId === filter);
  const shown = scoped.filter((a) => tab === 'all' || a.status === tab);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateAction(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await createAction(form);
      setOpen(false);
      setForm({ areaId, title: '', category: '', priority: 'Medium', notes: '' });
      reload();
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Could not create the action.' });
    }
  };

  const move = async (a, status) => {
    setBusy(a.id);
    try { await updateActionStatus(a.id, status); await reload(); } finally { setBusy(null); }
  };

  const tabs = [{ value: 'all', label: 'All', count: scoped.length }, ...ACTION_STATUSES.map((s) => ({ value: s, label: s, count: scoped.filter((a) => a.status === s).length }))];

  return (
    <>
      <PageHeader title="Action tracker" subtitle="Follow every action from Planned to Resolved.">
        <select className="input !w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by area">
          <option value="all">All areas</option>
          {areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onChange={setTab} tabs={tabs} />
        <Button onClick={() => setOpen((o) => !o)}><Plus size={16} /> New action</Button>
      </div>

      {open && (
        <Card title="New action" className="mb-4">
          <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
            <Field label="Area" error={errors.areaId}><select className="input" value={form.areaId} onChange={set('areaId')}>{areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></Field>
            <Field label="Category" error={errors.category}><select className="input" value={form.category} onChange={set('category')}><option value="">Select category</option>{INTERVENTION_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Title" error={errors.title}><input className="input" value={form.title} onChange={set('title')} placeholder="e.g. Desilt Barki pond" /></Field>
            <Field label="Priority"><select className="input" value={form.priority} onChange={set('priority')}>{URGENCY_LEVELS.slice().reverse().map((p) => <option key={p}>{p}</option>)}</select></Field>
            <div className="sm:col-span-2"><Field label="Notes (optional)"><textarea rows={2} className="input" value={form.notes} onChange={set('notes')} /></Field></div>
            {errors.form && <p className="text-sm font-medium text-red-500 sm:col-span-2">{errors.form}</p>}
            <div className="sm:col-span-2"><Button type="submit">Create action</Button></div>
          </form>
        </Card>
      )}

      {shown.length === 0 ? <EmptyState title="No actions here" text="Plan an action from the Panchayat dashboard or create a new one." /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {shown.map((a) => {
            const next = ACTION_STATUSES[ACTION_STATUSES.indexOf(a.status) + 1];
            return (
              <Card key={a.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-navy-900">{a.title}</p>
                    <p className="text-xs text-slate-500">{areaName(a.areaId)} · {a.category} · Created {formatDate(a.createdAt)}</p>
                  </div>
                  <Badge status={a.priority}>{a.priority} priority</Badge>
                </div>
                <div className="my-4"><StatusStepper status={a.status} /></div>
                {a.notes && <p className="text-sm text-slate-600">{a.notes}</p>}
                <ul className="mt-3 space-y-0.5 text-xs text-slate-400">
                  {a.history.map((h, i) => <li key={i}>{h.status} · {formatDate(h.date)}</li>)}
                </ul>
                {next && (
                  <Button className="mt-4 w-full" variant={next === 'Resolved' ? 'primary' : 'dark'} disabled={busy === a.id} onClick={() => move(a, next)}>
                    {busy === a.id ? 'Updating...' : next === 'Resolved' ? 'Mark as resolved' : `Move to ${next}`}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}