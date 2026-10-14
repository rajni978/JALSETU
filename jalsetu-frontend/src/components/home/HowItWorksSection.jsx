import { Link } from 'react-router-dom';
import { STEPS } from './steps';

export default function HowItWorksSection() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold">How it works</h2>
      <p className="mt-2 max-w-2xl text-slate-600">From knowing the problem to measuring the result, in eight steps.</p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text, to }, i) => (
          <li key={title}>
            <Link to={to} className="block h-full rounded-2xl bg-white p-5 shadow-card transition hover:ring-2 hover:ring-aqua-400">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-800 text-sm font-bold text-white">{i + 1}</span>
                <Icon size={20} className="text-aqua-600" />
              </div>
              <p className="font-bold text-navy-900">{title}</p>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}