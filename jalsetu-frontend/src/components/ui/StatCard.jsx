import Card from './Card';

export default function StatCard({ icon: Icon, label, value, hint, tone = 'text-aqua-600 bg-aqua-50' }) {
  return (
    <Card className="group flex items-center gap-4">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 ${tone}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-extrabold tracking-tight text-navy-900">{value}</p>
        {hint && <p className="truncate text-xs text-slate-400">{hint}</p>}
      </div>
    </Card>
  );
}