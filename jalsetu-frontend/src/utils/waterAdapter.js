// Converts Kajal's WaterData records (backend) into the "area" shape used by the UI.
// Backend fields: location, groundwaterLevel, rainfall, waterBodyCondition, latitude, longitude, createdAt
import { stressLevel } from './stress';

// Same rules as Kajal's getWaterRiskScore (waterDataController.js).
// Used only to EXPLAIN the score in the "Why?" section. Score + level come from the backend /risk route.
function buildStress(w, risk) {
  const g = w.groundwaterLevel;
  const r = w.rainfall;
  const c = w.waterBodyCondition;

  const gp = g < 5 ? 40 : g < 10 ? 25 : 10;
  const rp = r < 500 ? 30 : r < 1000 ? 20 : 10;
  const cp = c === 'Poor' ? 30 : c === 'Moderate' ? 20 : 10;

  const make = (key, label, weight, points, value, why) => ({
    key, label, weight, points, value, why,
    risk: (points / weight) * 100,
    level: stressLevel((points / weight) * 100),
  });

  const factors = [
    make('groundwater', 'Groundwater', 40, gp, `Level ${g}`,
      g < 5 ? 'Groundwater level is very low (below 5). This is the highest risk band.'
        : g < 10 ? 'Groundwater level is low (5 to 10). This is the medium risk band.'
          : 'Groundwater level is 10 or more. This is the lowest risk band.'),
    make('rainfall', 'Rainfall', 30, rp, `${r} mm`,
      r < 500 ? 'Rainfall is below 500 mm. This is the highest risk band.'
        : r < 1000 ? 'Rainfall is between 500 and 1000 mm. This is the medium risk band.'
          : 'Rainfall is 1000 mm or more. This is the lowest risk band.'),
    make('waterBodies', 'Water bodies', 30, cp, c,
      c === 'Poor' ? 'Water bodies are in poor condition. This is the highest risk band.'
        : c === 'Moderate' ? 'Water bodies are in moderate condition. This is the medium risk band.'
          : 'Water bodies are in good condition. This is the lowest risk band.'),
  ];

  const score = risk?.score ?? gp + rp + cp;
  const level = risk?.riskLevel ?? (score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low');
  return { score, level, factors };
}

const shortDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

// records = all WaterData documents of one location
export function toArea(records, risk) {
  const sorted = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const w = sorted[0];
  return {
    live: true,
    id: w._id,
    name: w.location,
    district: '',
    lat: w.latitude,
    lng: w.longitude,
    population: null,
    rainfall: { actual: w.rainfall },
    groundwater: { level: w.groundwaterLevel },
    waterBody: w.waterBodyCondition,
    history: [...sorted].reverse().map((r) => ({ date: shortDate(r.createdAt), rainfall: r.rainfall, level: r.groundwaterLevel })),
    stress: buildStress(w, risk),
  };
}

// Group all records by location, newest record of each location first
export function groupByLocation(list = []) {
  const map = new Map();
  list.forEach((w) => {
    const key = (w.location || '').trim().toLowerCase();
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  });
  return [...map.values()];
}