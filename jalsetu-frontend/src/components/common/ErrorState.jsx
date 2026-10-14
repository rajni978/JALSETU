import Button from '../ui/Button';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-card">
      <p className="font-semibold text-navy-900">Could not load data</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
      {onRetry && <Button className="mt-4" onClick={onRetry}>Try again</Button>}
    </div>
  );
}