import Card from './Card';

export default function StatCard({ icon: Icon, label, value, hint, tone = 'text-aqua-600 bg-aqua-50' }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-xl font-extrabold text-navy-900">{value}</p>
        {hint && <p className="truncate text-xs text-slate-400">{hint}</p>}
      </div>
    </Card>
  );
}