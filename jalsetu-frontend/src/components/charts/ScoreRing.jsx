import { useEffect, useState } from 'react';
import { levelHex } from '../../utils/helpers';

// Circular water stress score (0-100). Higher = more stress. The ring fills with an animation.
export default function ScoreRing({ value = 0, level = 'Low', size = 'h-40 w-40' }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const t = setTimeout(() => setShown(value), 80);
    return () => {
      clearTimeout(t);
    };
  }, [value]);

  const r = 52;
  const c = 2 * Math.PI * r;
  const color = levelHex(level);
  return (
    <div className={`relative mx-auto ${size}`} role="img" aria-label={`Water stress score ${value} out of 100, ${level}`}>
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * shown) / 100}
          style={{ transition: 'stroke-dashoffset 1.1s ease-out, stroke .4s' }} />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-4xl font-extrabold text-navy-900">{value}</span>
        <span className="text-xs font-bold" style={{ color }}>{level} stress</span>
      </div>
    </div>
  );
}