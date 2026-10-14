import { Link } from 'react-router-dom';
import { useArea } from '../context/AreaContext';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaMap from '../components/common/AreaMap';
import { levelHex } from '../utils/helpers';

export default function MapView() {
  const { areas, area, setAreaId, loading, error, reload } = useArea();
  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <>
      <PageHeader title="Water stress map" subtitle="Each circle is an area. Colour shows its water stress. Click one to select it." />
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <Card title="Legend">
            {['High', 'Medium', 'Low'].map((l) => (
              <p key={l} className="flex items-center gap-2 py-1 text-sm"><span className="h-3.5 w-3.5 rounded-full" style={{ background: levelHex(l) }} />{l} stress</p>
            ))}
          </Card>
          {area && (
            <Card title={`Selected: ${area.name}`}>
              <Badge status={area.stress.level}>{area.stress.level} stress · {area.stress.score}</Badge>
              <p className="mt-3 text-sm text-slate-600">{area.stress.factors.slice().sort((a, b) => b.points - a.points)[0].why}</p>
              <Button as={Link} to="/dashboard" className="mt-4 w-full" variant="dark">See full details</Button>
            </Card>
          )}
          <Card title="All areas">
            <ul className="space-y-1">
              {areas.slice().sort((a, b) => b.stress.score - a.stress.score).map((a) => (
                <li key={a.id}>
                  <button onClick={() => setAreaId(a.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50 ${a.id === area?.id ? 'bg-aqua-50 font-bold' : ''}`}>
                    <span>{a.name}</span><Badge status={a.stress.level}>{a.stress.score}</Badge>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <Card className="!p-2"><AreaMap areas={areas} selectedId={area?.id} onSelect={setAreaId} /></Card>
      </div>
    </>
  );
}