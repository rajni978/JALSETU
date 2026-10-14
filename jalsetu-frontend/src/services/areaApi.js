import api, { request, USE_MOCK } from './api';
import { areas, rainfallSeries, groundwaterSeries } from '../data/mockData';
import { computeStress } from '../utils/stress';
import { toArea, groupByLocation } from '../utils/waterAdapter';

// Real water-data from Kajal's backend when:
//  - VITE_USE_MOCK=false (everything real), or
//  - VITE_REAL_WATER_DATA=true (only areas real, rest still mock)
const REAL = !USE_MOCK || import.meta.env.VITE_REAL_WATER_DATA === 'true';

const withStress = (a) => (a.stress ? a : { ...a, stress: computeStress(a) });

async function getLiveAreas() {
  const res = await api.get('/water-data');
  const groups = groupByLocation(res.data.waterData || []);
  return Promise.all(
    groups.map(async (records) => {
      const latest = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      const risk = await api.get(`/water-data/${latest._id}/risk`).then((r) => r.data).catch(() => null);
      return toArea(records, risk);
    })
  );
}

export const getAreas = async () => {
  if (REAL) return getLiveAreas();
  return (await request(() => api.get('/areas'), areas)).map(withStress);
};

// Only used in mock mode (live areas carry their own `history`)
export const getRainfallSeries = (id) =>
  request(() => api.get(`/areas/${id}/rainfall`), () => rainfallSeries(areas.find((a) => a.id === id)));

export const getGroundwaterSeries = (id) =>
  request(() => api.get(`/areas/${id}/groundwater`), () => groundwaterSeries(areas.find((a) => a.id === id)));