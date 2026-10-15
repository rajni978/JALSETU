import { Link } from 'react-router-dom';
import { CloudRain, Layers, Waves, Users } from 'lucide-react';
import { useArea } from '../context/AreaContext';
import useFetch from '../hooks/useFetch';
import { getRainfallSeries, getGroundwaterSeries } from '../services/areaApi';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaSelector from '../components/common/AreaSelector';
import StressScoreCard from '../components/common/StressScoreCard';
import WhyList from '../components/common/WhyList';
import RainfallChart from '../components/charts/RainfallChart';
import TrendChart from '../components/charts/TrendChart';
import WaterBodiesBar from '../components/charts/WaterBodiesBar';
import SelectedLocationDashboard from './SelectedLocationDashboard';
import LocationDataCards from '../components/common/LocationDataCards';
function ExistingAreaDashboard() {
  const { area, loading: areaLoading, error: areaError, reload } = useArea();
  const { data, loading, error, reload: reloadSeries } = useFetch(
    async () => ({ rain: await getRainfallSeries(area.id), gw: await getGroundwaterSeries(area.id) }),
    [area?.id]
  );

  if (areaLoading) return <Loader />;
  if (areaError) return <ErrorState message={areaError} onRetry={reload} />;
  if (!area) return <ErrorState message="No areas available yet." onRetry={reload} />;

  const deficit = Math.max(0, Math.round(((area.rainfall.normal - area.rainfall.actual) / area.rainfall.normal) * 100));
  const gwChange = (area.groundwater.depth - area.groundwater.prevDepth).toFixed(1);

  return (
    <>
      <PageHeader title={`Water situation in ${area.name}`} subtitle={`${area.district} district · ${area.population.toLocaleString('en-IN')} people`}>
        <AreaSelector />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CloudRain} label="Rainfall this season" value={`${area.rainfall.actual} mm`} hint={deficit ? `${deficit}% below normal` : 'At or above normal'} tone="bg-sky-50 text-sky-600" />
        <StatCard icon={Layers} label="Groundwater depth" value={`${area.groundwater.depth} m`} hint={+gwChange > 0 ? `${gwChange} m deeper than last year` : 'Same as last year'} tone="bg-indigo-50 text-indigo-600" />
        <StatCard icon={Waves} label="Water bodies holding water" value={`${area.waterBodies.active}/${area.waterBodies.total}`} hint={`${area.waterBodies.dried} dry or almost dry`} />
        <StatCard icon={Users} label="People in this area" value={area.population.toLocaleString('en-IN')} hint={`${area.district} district`} tone="bg-amber-50 text-amber-600" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <StressScoreCard area={area} />
        <div className="lg:col-span-2"><WhyList factors={area.stress.factors} /></div>
      </div>

      {loading && <Loader text="Loading charts..." />}
      {error && <div className="mt-4"><ErrorState message={error} onRetry={reloadSeries} /></div>}
      {data && (
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card title="Rainfall: actual vs normal" className="lg:col-span-2"><RainfallChart data={data.rain} /></Card>
          <Card title="Water bodies"><WaterBodiesBar {...area.waterBodies} /></Card>
          <Card title="Groundwater depth (metres below ground)" className="lg:col-span-3">
            <TrendChart data={data.gw} xKey="month" yKey="depth" unit=" m" color="#0f4c85" height={220} />
            <p className="mt-2 text-xs text-slate-500">A rising line means water is getting deeper and harder to reach.</p>
          </Card>
        </div>
      )}

      <Card className="mt-4 flex flex-wrap items-center justify-between gap-3 !bg-navy-900 text-white">
        <p className="font-bold">Want to help your area?</p>
        <div className="flex flex-wrap gap-3">
          <Button as={Link} to="/what-can-i-do" className="bg-white !text-navy-900 hover:bg-sky-50">What can I do?</Button>
          <Button as={Link} to="/report" className="border border-white/40 !bg-transparent hover:!bg-white/10">Report a problem</Button>
        </div>
      </Card>
    </>
  );
}

export default function Dashboard() {
  const { selectedLocation } = useArea();

  if (selectedLocation) {
    return <SelectedLocationDashboard location={selectedLocation} />;
  }

  return <ExistingAreaDashboard />;
}