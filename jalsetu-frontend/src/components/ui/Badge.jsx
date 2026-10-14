import { getStatusBadgeColor } from '../../utils/helpers';

export default function Badge({ status, children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeColor(status)}`}>
      {children || status}
    </span>
  );
}