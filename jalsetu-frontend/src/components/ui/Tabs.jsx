export default function Tabs({ tabs, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-white p-1 shadow-card">
      {tabs.map((t) => (
        <button key={t.value} onClick={() => onChange(t.value)}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${value === t.value ? 'bg-navy-800 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
          {t.label}{t.count !== undefined && <span className="ml-1.5 opacity-70">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}