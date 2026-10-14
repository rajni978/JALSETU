export default function Field({ label, error, hint, children }) {
  return (
    <label className="block text-sm font-semibold text-navy-900">
      {label}
      <div className="mt-1 font-normal">{children}</div>
      {hint && !error && <p className="mt-1 text-xs font-normal text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </label>
  );
}