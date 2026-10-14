// Status / level -> Tailwind badge colours
export const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'low':
    case 'resolved':
    case 'completed':
      return 'bg-emerald-500/10 text-emerald-600';
    case 'medium':
    case 'in progress':
    case 'under review':
      return 'bg-amber-500/10 text-amber-600';
    case 'high':
    case 'critical':
      return 'bg-red-500/10 text-red-600';
    case 'pending':
    case 'planned':
    case 'action planned':
      return 'bg-cyan-500/10 text-cyan-600';
    default:
      return 'bg-slate-500/10 text-slate-600';
  }
};

export const levelHex = (level) =>
  ({ low: '#10b981', medium: '#f59e0b', high: '#ef4444' }[level?.toLowerCase()] || '#64748b');

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const timeAgo = (d) => {
  const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)} hr ago`;
  return `${Math.floor(mins / 1440)} d ago`;
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const areaLabel = (a) => (a.district ? `${a.name}, ${a.district}` : a.name);
