import { Link } from 'react-router-dom';
import { STEPS } from './steps';
import Reveal from './Reveal';

export default function HowItWorksSection() {
  return (
    <section>
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight">How it works</h2>
        <p className="mt-2 max-w-2xl text-slate-600">From knowing the problem to measuring the result, in eight steps.</p>
      </Reveal>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text, to }, i) => (
          <li key={title}>
            <Reveal delay={(i % 4) * 100} className="h-full">
              <Link to={to} className="block h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-aqua-400 hover:shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-800 text-sm font-bold text-white">{i + 1}</span>
                  <Icon size={22} className="text-aqua-600" />
                </div>
                <p className="font-bold text-navy-900">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}