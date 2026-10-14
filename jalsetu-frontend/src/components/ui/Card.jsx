import { cn } from '../../utils/helpers';

export default function Card({ title, action, children, className = '' }) {
  return (
    <section className={cn('rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(8,47,85,.10)]', className)}>
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="text-sm font-bold text-navy-900">{title}</h3>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}