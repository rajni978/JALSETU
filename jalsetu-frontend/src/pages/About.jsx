import AboutSection from '../components/home/AboutSection';
import Card from '../components/ui/Card';

const TEAM = [
  ['Rajni', 'Data, water stress score logic and research'],
  ['Neha', 'React frontend and user experience'],
  ['Kajal', 'Backend, APIs and database'],
];

export default function About() {
  return (
    <div className="space-y-10">
      <AboutSection />
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Data and transparency">
          <p className="text-sm text-slate-600">The water stress score uses three indicators: groundwater depth (40%), rainfall compared with normal (35%) and the share of dry ponds and tanks (25%). The “Why?” section on the dashboard shows how many points each one adds.</p>
          <p className="mt-3 text-sm text-slate-600">Priority for the Panchayat is also rule-based and the rules are shown on the Panchayat dashboard.</p>
          <p className="mt-3 rounded-lg bg-amber-500/10 p-3 text-xs font-semibold text-amber-700">Figures in this demo are sample data. Final data sources and assumptions are listed in the project’s data-sources document.</p>
        </Card>
        <Card title="Team">
          <ul className="divide-y divide-slate-100">
            {TEAM.map(([n, r]) => (
              <li key={n} className="flex items-center gap-3 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-aqua-100 text-sm font-bold text-aqua-600">{n[0]}</span>
                <div><p className="text-sm font-bold text-navy-900">{n}</p><p className="text-xs text-slate-500">{r}</p></div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}