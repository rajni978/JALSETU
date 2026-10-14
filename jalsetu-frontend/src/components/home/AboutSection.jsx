import { Droplets, Users, Landmark } from 'lucide-react';
import Reveal from './Reveal';

const BLOCKS = [
  { icon: Droplets, title: 'The problem', text: 'Many villages face dry handpumps and empty ponds every summer. The data exists, but it is scattered and hard for ordinary people to understand.' },
  { icon: Users, title: 'For villagers', text: 'JALSETU turns rainfall, groundwater and water body data into one clear score and tells you what you can do about it.' },
  { icon: Landmark, title: 'For the Panchayat', text: 'Community reports and water stress are combined to show where to work first, and every action is tracked until the result is measured.' },
];

export default function AboutSection() {
  return (
    <section>
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight">About JALSETU</h2>
        <p className="mt-2 max-w-2xl text-slate-600">JALSETU is a bridge (setu) between water data and community action.</p>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {BLOCKS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 120}>
            <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aqua-400 to-aqua-600 text-white shadow-md"><Icon size={22} /></span>
              <p className="text-lg font-bold text-navy-900">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}