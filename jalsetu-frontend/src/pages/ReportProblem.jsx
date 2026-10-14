import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import { createReport } from '../services/communityApi';
import { validateReport } from '../utils/validators';
import { REPORT_CATEGORIES, URGENCY_LEVELS } from '../utils/constants';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import Loader from '../components/common/Loader';

export default function ReportProblem() {
const { areas, areaId, selectedLocation, loading } = useArea(); 
const blank = () => ({
  areaId: selectedLocation ? '' : areaId,
  locationName: selectedLocation?.name || '',
  latitude: selectedLocation?.latitude ?? null,
  longitude: selectedLocation?.longitude ?? null,
  village: '',
  category: '',
  urgency: '',
  description: '',
  name: '',
});  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  if (loading) return <Loader />;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateReport(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
await createReport({
  ...form,
  name: form.name.trim() || 'Anonymous',
  location: selectedLocation
    ? {
        name: selectedLocation.name,
        formatted: selectedLocation.formatted,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }
    : undefined,
});      setDone(true);
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Could not send your report. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
        <h2 className="mt-3 text-xl font-extrabold">Report sent</h2>
        <p className="mt-1 text-sm text-slate-600">Thank you. The Panchayat can now see your report and use it to decide priorities.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button as={Link} to="/community">See community reports</Button>
          <Button variant="outline" onClick={() => { setForm(blank()); setDone(false); }}>Report another</Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <PageHeader title="Report a water problem" subtitle="Tell us what is wrong. It takes less than a minute." />
      <Card className="mx-auto max-w-2xl">
        <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field label="Selected location" error={errors.areaId}>
  {selectedLocation ? (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="font-semibold text-slate-800">
        {selectedLocation.name}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {selectedLocation.formatted}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {selectedLocation.latitude}, {selectedLocation.longitude}
      </p>
    </div>
  ) : (
    <select className="input" value={form.areaId} onChange={set('areaId')}>
      {areas.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}, {a.district}
        </option>
      ))}
    </select>
  )}
</Field>
          <Field label="Village or locality" error={errors.village}>
            <input className="input" value={form.village} onChange={set('village')} placeholder="e.g. Barki" />
          </Field>
          <Field label="What is the problem?" error={errors.category}>
            <select className="input" value={form.category} onChange={set('category')}>
              <option value="">Select problem type</option>
              {REPORT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="How urgent is it?" error={errors.urgency}>
            <select className="input" value={form.urgency} onChange={set('urgency')}>
              <option value="">Select urgency</option>
              {URGENCY_LEVELS.map((u) => <option key={u}>{u}</option>)}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Describe the problem" error={errors.description} hint="What did you see, and since when?">
              <textarea rows={4} className="input" value={form.description} onChange={set('description')} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Your name (optional)">
              <input className="input" value={form.name} onChange={set('name')} />
            </Field>
          </div>
          {errors.form && <p className="text-sm font-medium text-red-500 sm:col-span-2">{errors.form}</p>}
          <div className="sm:col-span-2"><Button type="submit" disabled={saving} className="w-full sm:w-auto">{saving ? 'Sending...' : 'Send report'}</Button></div>
        </form>
      </Card>
    </>
  );
}