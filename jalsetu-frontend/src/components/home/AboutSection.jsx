import { Droplets, Users, Landmark } from 'lucide-react';

const BLOCKS = [
  { icon: Droplets, title: 'The problem', text: 'Many villages face dry handpumps and empty ponds every summer. The data exists, but it is scattered and hard for ordinary people to understand.' },
  { icon: Users, title: 'For villagers', text: 'JALSETU turns rainfall, groundwater and water body data into one clear score and tells you what you can do about it.' },
  { icon: Landmark, title: 'For the Panchayat', text: 'Community reports and water stress are combined to show where to work first, and every action is tracked until the result is measured.' },
];

export default function AboutSection() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold">About JALSETU</h2>
      <p className="mt-2 max-w-2xl text-slate-600">JALSETU is a bridge (setu) between water data and community action.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {BLOCKS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-white p-5 shadow-card">
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-aqua-50 text-aqua-600"><Icon size={20} /></span>
            <p className="font-bold text-navy-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}