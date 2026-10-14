import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import useFetch from '../hooks/useFetch';
import { getReports, getSuggestions, createSuggestion, voteSuggestion } from '../services/communityApi';
import { validateSuggestion } from '../utils/validators';
import { INTERVENTION_CATEGORIES } from '../utils/constants';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import ReportCard from '../components/common/ReportCard';
import SuggestionCard from '../components/common/SuggestionCard';

export default function Community() {
  const { areas, areaId } = useArea();
  const { data, loading, error, reload } = useFetch(async () => ({ reports: await getReports(), suggestions: await getSuggestions() }));
  const [tab, setTab] = useState('reports');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ areaId, title: '', category: '', description: '', name: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [voted, setVoted] = useState({});

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const areaName = (id) => areas.find((a) => a.id === id)?.name || '';
  const inArea = (x) => filter === 'all' || x.areaId === filter;
  const reports = data.reports.filter(inArea);
  const suggestions = data.suggestions.filter(inArea);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateSuggestion(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      await createSuggestion({ ...form, name: form.name.trim() || 'Anonymous' });
      setForm({ areaId, title: '', category: '', description: '', name: '' });
      setOpen(false);
      reload();
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Could not post your suggestion.' });
    } finally {
      setSaving(false);
    }
  };

  const vote = async (id) => {
    setVoted((v) => ({ ...v, [id]: true }));
    try { await voteSuggestion(id); } catch { setVoted((v) => ({ ...v, [id]: false })); }
  };

  return (
    <>
      <PageHeader title="Community" subtitle="Problems reported by people, and solutions they suggest.">
        <select className="input !w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by area">
          <option value="all">All areas</option>
          {areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onChange={setTab} tabs={[{ value: 'reports', label: 'Reports', count: reports.length }, { value: 'suggestions', label: 'Suggestions', count: suggestions.length }]} />
        {tab === 'reports'
          ? <Button as={Link} to="/report"><Plus size={16} /> Report a problem</Button>
          : <Button onClick={() => setOpen((o) => !o)}><Plus size={16} /> Suggest a solution</Button>}
      </div>

      {tab === 'suggestions' && open && (
        <Card title="Suggest a solution" className="mb-4">
          <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
            <Field label="Area" error={errors.areaId}>
              <select className="input" value={form.areaId} onChange={set('areaId')}>{areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
            </Field>
            <Field label="Type of work" error={errors.category}>
              <select className="input" value={form.category} onChange={set('category')}>
                <option value="">Select category</option>{INTERVENTION_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2"><Field label="Title" error={errors.title}><input className="input" value={form.title} onChange={set('title')} placeholder="e.g. Restore the village pond" /></Field></div>
            <div className="sm:col-span-2"><Field label="Your idea" error={errors.description}><textarea rows={3} className="input" value={form.description} onChange={set('description')} /></Field></div>
            <Field label="Your name (optional)"><input className="input" value={form.name} onChange={set('name')} /></Field>
            {errors.form && <p className="text-sm font-medium text-red-500 sm:col-span-2">{errors.form}</p>}
            <div className="sm:col-span-2"><Button type="submit" disabled={saving}>{saving ? 'Posting...' : 'Post suggestion'}</Button></div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {tab === 'reports' && (reports.length
          ? reports.map((r) => <ReportCard key={r.id} r={r} areaName={areaName(r.areaId)} />)
          : <EmptyState title="No reports here yet" text="When someone reports a water problem in this area, it will appear here." />)}
        {tab === 'suggestions' && (suggestions.length
          ? suggestions.map((s) => <SuggestionCard key={s.id} s={s} areaName={areaName(s.areaId)} onVote={vote} voted={voted[s.id]} />)
          : <EmptyState title="No suggestions yet" text="Be the first to suggest a solution for this area." />)}
      </div>
    </>
  );
}