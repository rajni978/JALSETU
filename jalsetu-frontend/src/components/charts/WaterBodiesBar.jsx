export default function WaterBodiesBar({ total, active, dried }) {
  const pct = (n) => `${(n / total) * 100}%`;
  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full bg-slate-100">
        <div className="bg-aqua-500" style={{ width: pct(active) }} />
        <div className="bg-amber-400" style={{ width: pct(dried) }} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div><p className="text-2xl font-extrabold text-navy-900">{total}</p><p className="text-xs text-slate-500">Total ponds & tanks</p></div>
        <div><p className="text-2xl font-extrabold text-aqua-600">{active}</p><p className="text-xs text-slate-500">Holding water</p></div>
        <div><p className="text-2xl font-extrabold text-amber-500">{dried}</p><p className="text-xs text-slate-500">Dry or almost dry</p></div>
      </div>
    </div>
  );
}