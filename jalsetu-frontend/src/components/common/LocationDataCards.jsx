import { CloudRain, Layers, Waves, Users } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import { getRainfallYTD, getNearbyWaterBodies } from '../../services/locationData';
import StatCard from '../ui/StatCard';
import Button from '../ui/Button';

// Shows real data for a location. Usage: <LocationDataCards lat={30.909} lon={75.851} />
export default function LocationDataCards({ lat, lon }) {
  const rain = useFetch(() => getRainfallYTD(lat, lon), [lat, lon]);
  const water = useFetch(() => getNearbyWaterBodies(lat, lon), [lat, lon]);

  const errors = [rain.error, water.error].filter(Boolean);
  const retry = () => {
    if (rain.error) rain.reload();
    if (water.error) water.reload();
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CloudRain} tone="bg-sky-50 text-sky-600" label="Rainfall (year to date)"
          value={rain.loading ? 'Loading...' : rain.data ? `${rain.data.totalMm.toLocaleString('en-IN')} mm` : 'Unavailable'}
          hint={rain.data ? `${rain.data.source} · 1 Jan to ${rain.data.to}` : rain.error ? 'Could not load' : 'Fetching...'} />

        <StatCard icon={Layers} tone="bg-indigo-50 text-indigo-600" label="Groundwater depth"
          value="Not available" hint="Needs CGWB data from the backend" />

        <StatCard icon={Waves}
          label={`Water bodies within ${water.data?.radiusKm ?? 10} km`}
          value={water.loading ? 'Loading...' : water.data ? water.data.count.toLocaleString('en-IN') : 'Unavailable'}
          hint={water.data ? `Mapped in ${water.data.source}` : water.error ? 'Could not load' : 'Fetching...'} />

        <StatCard icon={Users} tone="bg-amber-50 text-amber-600" label="Population"
          value="Not available" hint="Needs Census data from the backend" />
      </div>

      {errors.length > 0 && (
        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          {errors.map((e) => <p key={e}>{e}</p>)}
          <Button className="mt-3" onClick={retry}>Try again</Button>
        </div>
      )}
    </>
  );
}