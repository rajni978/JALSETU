import { Link } from 'react-router-dom';
import { Home, Trees, Users } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import { actionsByLevel } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaSelector from '../components/common/AreaSelector';

const GROUPS = [
  { who: 'At home', icon: Home },
  { who: 'In your village', icon: Trees },
  { who: 'With the community', icon: Users },
];

export default function WhatCanIDo() {
  const { area, loading, error, reload } = useArea();
  if (loading) return <Loader />;
  if (error || !area) return <ErrorState message={error || 'No area selected'} onRetry={reload} />;

  const list = actionsByLevel[area.stress.level];

  return (
    <>
      <PageHeader title="What can I do?" subtitle="Practical steps matched to your area’s water situation.">
        <AreaSelector />
      </PageHeader>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm"><b className="text-navy-900">{area.name}</b> has <Badge status={area.stress.level}>{area.stress.level} water stress ({area.stress.score})</Badge></p>
        <Link to="/dashboard" className="text-sm font-semibold text-aqua-600 hover:underline">See why</Link>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {GROUPS.map(({ who, icon: Icon }) => {
          const items = list.filter((a) => a.who === who);
          return (
            <Card key={who} title={who}>
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-aqua-50 text-aqua-600"><Icon size={18} /></div>
              <ul className="space-y-4">
                {items.map((a) => (
                  <li key={a.id}>
                    <p className="text-sm font-bold text-navy-900">{a.title}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{a.text}</p>
                  </li>
                ))}
                {items.length === 0 && <li className="text-sm text-slate-500">No extra steps needed here right now.</li>}
              </ul>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy-900">Seen a problem or have an idea for your area?</p>
        <div className="flex gap-3">
          <Button as={Link} to="/report">Report a problem</Button>
          <Button as={Link} to="/community" variant="outline">Suggest a solution</Button>
        </div>
      </Card>
    </>
  );
}