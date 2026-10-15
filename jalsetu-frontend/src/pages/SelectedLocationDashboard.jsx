
import { useEffect, useState } from 'react';
import { CloudRain, Layers, Waves, Users, MapPin } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import AreaSelector from '../components/common/AreaSelector';



function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function normalizeDailyRainfall(raw) {
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      date: String(item.date ?? item.DATE ?? item.day ?? '—'),
      rainfall: Number(
        item.rainfallMm ?? item.rainfall ?? item.value ?? item.PRECTOTCORR ?? 0
      ),
    }));
  }

  if (raw && typeof raw === 'object') {
    return Object.entries(raw).map(([date, value]) => ({
      date,
      rainfall: Number(
        typeof value === 'object'
          ? value.rainfallMm ?? value.value ?? value.PRECTOTCORR ?? 0
          : value
      ),
    }));
  }

  return [];
}

export default function SelectedLocationDashboard({ location }) {
    const [population, setPopulation] = useState(null);
const [populationLoading, setPopulationLoading] = useState(false);
const [populationSource, setPopulationSource] = useState('');

  const [rainfall, setRainfall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadRainfall() {
      setLoading(true);
      setError('');
      setRainfall(null);

      try {
        // NASA POWER data can have a reporting delay.
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 2);

        const startDate = new Date(endDate.getFullYear(), 0, 1);

        const response = await api.get('/environment/rainfall', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            start: getDateString(startDate),
            end: getDateString(endDate),
          },
        });

        if (!cancelled) {
          setRainfall({
            ...response.data,
            dailyRainfall: normalizeDailyRainfall(
              response.data.dailyRainfall
            ),
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              '- Failed to load rainfall data. Please check the backend and API.'
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (
      Number.isFinite(Number(location.latitude)) &&
      Number.isFinite(Number(location.longitude))
    ) {
      loadRainfall();
    } else {
      setError('Valid coordinates were not found for the selected location..');
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [location.latitude, location.longitude]);

  const dailyRows = rainfall?.dailyRainfall || [];
  const total = Number(rainfall?.totalRainfallMm);
  const hasTotal = Number.isFinite(total);
  const placeName = location.formatted || location.name || 'Selected location';

  return (
    <>
      <PageHeader
        title={`Water situation in ${location.name || 'selected location'}`}
        subtitle={placeName}
      >
        <AreaSelector />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CloudRain}
          label="Rainfall (year to date)"
          value={
            loading
              ? 'Loading...'
              : hasTotal
                ? `${total.toFixed(1)} mm`
                : 'Unavailable'
          }
          hint="NASA POWER · modelled gridded data"
          tone="bg-sky-50 text-sky-600"
        />

        <StatCard
          icon={Layers}
          label="Groundwater depth"
          value="Unavailable"
          hint="Verified data not connected yet"
          tone="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          icon={Waves}
          label="Water bodies holding water"
          value="Unavailable"
          hint="Verified local data not connected yet"
        />

        <StatCard
  icon={Users}
  label="Population"
  value={
  populationLoading
    ? 'Loading...'
    : Number.isFinite(population) && population !== null
      ? population.toLocaleString('en-IN')
      : 'Population data unavailable'
}
  hint={
    populationSource
      ? `Source: ${populationSource}`
      : 'Verified population data not available'
  }
  tone="bg-amber-50 text-amber-600"
/>
      </div>

      {loading && <div className="mt-4"><Loader text="Fetching rainfall for this location..." /></div>}

      {error && (
        <div className="mt-4">
          <ErrorState message={error} onRetry={() => {
            setError('Please refresh the page to try again');
          }} />
        </div>
      )}

      {!loading && !error && rainfall && (
        <Card className="mt-4" title="Daily rainfall data">
          <p className="mb-3 text-sm text-slate-500">
            Location: {Number(location.latitude).toFixed(4)}, {Number(location.longitude).toFixed(4)}
          </p>
          <p className="mb-4 text-sm text-slate-500">
            Source: {rainfall.source || 'NASA POWER'} · Unit: {rainfall.unit || 'mm/day'}
          </p>

          {dailyRows.length === 0 ? (
            <p className="text-sm text-slate-500">
              Total rainfall was received from the API, but daily records are unavailable.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3">Rainfall (mm/day)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dailyRows].slice(-14).reverse().map((row, index) => (
                    <tr key={`${row.date}-${index}`} className="border-b last:border-0">
                      <td className="py-3 pr-4">{row.date}</td>
                      <td className="py-3">
                        {Number.isFinite(row.rainfall)
                          ? row.rainfall.toFixed(2)
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-slate-500">
                Showing up to 14 latest daily records returned by the API.
              </p>
            </div>
          )}
        </Card>
      )}

      <Card className="mt-4">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="mt-1 text-sky-600" />
          <div>
            <h3 className="font-semibold text-navy-900">Selected location</h3>
            <p className="mt-1 text-sm text-slate-600">{placeName}</p>
            <p className="mt-1 text-xs text-slate-500">
              Latitude: {location.latitude} · Longitude: {location.longitude}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
