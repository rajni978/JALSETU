import { cn } from '../../utils/helpers';

export default function Card({ title, action, children, className = '' }) {
  return (
    <section className={cn('rounded-2xl bg-white p-5 shadow-card', className)}>
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