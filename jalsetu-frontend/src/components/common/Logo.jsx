import { Droplet } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

export default function Logo({ light = false }) {
  return (
    <span className={`flex items-center gap-2 text-lg font-extrabold tracking-wide ${light ? 'text-white' : 'text-navy-900'}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-aqua-500 text-white"><Droplet size={18} fill="currentColor" /></span>
      {APP_NAME}
    </span>
  );
}