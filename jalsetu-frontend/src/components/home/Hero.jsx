import { Link } from 'react-router-dom';
import { Droplets, Users, Landmark } from 'lucide-react';
import Button from '../ui/Button';
import AreaSelector from '../common/AreaSelector';
import ScoreRing from '../charts/ScoreRing';
import Badge from '../ui/Badge';
import Bubbles from './Bubbles';
import WaveDivider from './WaveDivider';
import { useArea } from '../../context/AreaContext';

const CHIPS = [
  { icon: Droplets, text: 'Water stress score' },
  { icon: Users, text: 'Community reports' },
  { icon: Landmark, text: 'Panchayat action' },
];

export default function Hero() {
  const { area } = useArea();
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <Bubbles />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-36 pt-16 md:grid-cols-2 md:pt-24">
        <div className="animate-fade-up">
          <div className="mb-5 flex flex-wrap gap-2">
            {CHIPS.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Icon size={13} /> {text}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight !text-white md:text-6xl">
            Know your water.
            <span className="block bg-gradient-to-r from-aqua-100 to-white bg-clip-text text-transparent">Act before it runs out.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-sky-100/90">
            JALSETU shows how much water stress your area faces, explains why, and connects villagers and the Panchayat to act.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/dashboard" className="bg-white !px-6 !py-3 !text-navy-900 shadow-lg hover:bg-sky-50">Check my area</Button>
            <Button as={Link} to="/report" className="border border-white/40 !bg-transparent !px-6 !py-3 hover:!bg-white/10">Report a problem</Button>
          </div>
        </div>

        <div className="animate-float">
          <div className="rounded-3xl bg-white/95 p-6 text-slate-700 shadow-2xl ring-1 ring-white/40 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-bold text-navy-900">Try it: pick your area</p>
              <AreaSelector />
            </div>
            {area && (
              <div className="mt-5 text-center">
                <ScoreRing value={area.stress.score} level={area.stress.level} />
                <div className="mt-3"><Badge status={area.stress.level}>{area.stress.level} stress in {area.name}</Badge></div>
                <Link to="/dashboard" className="mt-3 inline-block text-sm font-semibold text-aqua-600 hover:underline">See why this score</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <WaveDivider />
    </section>
  );
}