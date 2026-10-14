import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import AreaSelector from '../common/AreaSelector';
import ScoreRing from '../charts/ScoreRing';
import Badge from '../ui/Badge';
import { useArea } from '../../context/AreaContext';

export default function Hero() {
  const { area } = useArea();
  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-aqua-600 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight !text-white md:text-5xl">Know your water. Act before it runs out.</h1>
          <p className="mt-4 max-w-md text-sky-100/90">JALSETU shows how much water stress your area faces, explains why, and connects villagers and the Panchayat to act.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/dashboard" className="bg-white !text-navy-900 hover:bg-sky-50">Check my area</Button>
            <Button as={Link} to="/report" className="border border-white/40 !bg-transparent hover:!bg-white/10">Report a problem</Button>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-2xl">
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
    </section>
  );
}