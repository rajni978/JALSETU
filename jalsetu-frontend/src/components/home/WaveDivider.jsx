// Animated water waves at the bottom of the hero. `fill` = colour of the page below the hero.
const PATH = 'M0,60 C200,0 400,120 600,60 C800,0 1000,120 1200,60 C1400,0 1600,120 1800,60 C2000,0 2200,120 2400,60 L2400,120 L0,120 Z';

export default function WaveDivider({ fill = '#f2f7fb' }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden leading-[0]" aria-hidden="true">
      <svg className="absolute bottom-0 h-full w-[200%] animate-wave-slow" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <path d={PATH} fill="#ffffff" fillOpacity="0.25" />
      </svg>
      <svg className="absolute bottom-0 h-[78%] w-[200%] animate-wave-fast" style={{ animationDirection: 'reverse' }} viewBox="0 0 2400 120" preserveAspectRatio="none">
        <path d={PATH} fill="#ffffff" fillOpacity="0.4" />
      </svg>
      <svg className="absolute bottom-0 h-[55%] w-[200%] animate-wave-slow" viewBox="0 0 2400 120" preserveAspectRatio="none">
        <path d={PATH} fill={fill} />
      </svg>
    </div>
  );
}