export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="grid place-items-center py-16 text-sm text-slate-500">
      <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-aqua-100 border-t-aqua-600" />
      {text}
    </div>
  );
}