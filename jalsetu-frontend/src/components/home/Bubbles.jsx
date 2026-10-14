// Small bubbles that rise slowly through the hero
const BUBBLES = [
  { left: '6%', size: 10, delay: 0, dur: 9 },
  { left: '14%', size: 18, delay: 2, dur: 12 },
  { left: '24%', size: 8, delay: 5, dur: 8 },
  { left: '33%', size: 14, delay: 1, dur: 11 },
  { left: '45%', size: 9, delay: 6, dur: 9 },
  { left: '55%', size: 20, delay: 3, dur: 13 },
  { left: '66%', size: 11, delay: 7, dur: 10 },
  { left: '76%', size: 16, delay: 2, dur: 12 },
  { left: '86%', size: 9, delay: 4, dur: 8 },
  { left: '93%', size: 13, delay: 0, dur: 11 },
];

export default function Bubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <span key={i} className="absolute bottom-0 animate-bubble rounded-full border border-white/40 bg-white/10"
          style={{ left: b.left, width: b.size, height: b.size, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }} />
      ))}
    </div>
  );
}