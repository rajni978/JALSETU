import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-aqua-600 text-white hover:bg-aqua-500',
  dark: 'bg-navy-800 text-white hover:bg-navy-700',
  outline: 'border border-slate-200 bg-white text-navy-800 hover:bg-slate-50',
  ghost: 'text-navy-800 hover:bg-slate-100',
};

export default function Button({ variant = 'primary', className = '', as: Tag = 'button', ...props }) {
  return (
    <Tag
      className={cn('inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60', variants[variant], className)}
      {...props}
    />
  );
}