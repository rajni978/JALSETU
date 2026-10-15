// Real data for any latitude / longitude. Both sources are free and need NO API key.
//  - Rainfall: Open-Meteo Historical Weather API (reanalysis, modelled grid)
//  - Water bodies: OpenStreetMap via the Overpass API (mapped lakes, ponds, reservoirs)

const OPEN_METEO = 'https://archive-api.open-meteo.com/v1/archive';
const OVERPASS = 'https://overpass-api.de/api/interpreter';
const LAG_DAYS = 7; // archive data arrives a few days late

const ymd = (d) => d.toISOString().slice(0, 10);
const check = (lat, lon) => {
  if (lat == null || lon == null || Number.isNaN(Number(lat)) || Number.isNaN(Number(lon))) {
    throw new Error('Location has no latitude / longitude');
  }
};

// daily = { time: [...], precipitation_sum: [1.2, null, ...] }  ->  { totalMm, days }
export function sumPrecip(daily) {
  const list = daily?.precipitation_sum;
  if (!Array.isArray(list)) throw new Error('Rainfall values missing in the response');
  let totalMm = 0;
  let days = 0;
  list.forEach((v) => {
    if (typeof v === 'number' && v >= 0) {
      totalMm += v;
      days += 1;
    }
  });
  return { totalMm: Math.round(totalMm), days };
}

// Rainfall from 1 January up to a few days ago, in mm
export async function getRainfallYTD(lat, lon) {
  check(lat, lon);
  const end = new Date();
  end.setDate(end.getDate() - LAG_DAYS);
  const start = new Date(end.getFullYear(), 0, 1, 12); // noon avoids timezone date shifts

  const url = `${OPEN_METEO}?${new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    start_date: ymd(start),
    end_date: ymd(end),
    daily: 'precipitation_sum',
    timezone: 'auto',
  })}`;

  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  } catch (e) {
    throw new Error(`Could not reach the rainfall service (${e.name}). Check internet.`);
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.reason || `Rainfall service error ${res.status}`);

  return { ...sumPrecip(json.daily), from: ymd(start), to: ymd(end), source: 'Open-Meteo' };
}

// Number of lakes / ponds / reservoirs mapped in OpenStreetMap within radiusKm
export async function getNearbyWaterBodies(lat, lon, radiusKm = 10) {
  check(lat, lon);
  const r = Math.round(radiusKm * 1000);
  const query = `[out:json][timeout:25];(way["natural"="water"](around:${r},${lat},${lon});relation["natural"="water"](around:${r},${lat},${lon}););out count;`;

  let res;
  try {
    res = await fetch(OVERPASS, {
      method: 'POST',
      body: new URLSearchParams({ data: query }),
      signal: AbortSignal.timeout(30000),
    });
  } catch (e) {
    throw new Error(`Could not reach the map service (${e.name}). Check internet.`);
  }
  if (!res.ok) throw new Error(`Map service error ${res.status}. Try again in a minute.`);

  const json = await res.json();
  const count = Number(json.elements?.[0]?.tags?.total);
  if (!Number.isFinite(count)) throw new Error('Unexpected response from the map service');
  return { count, radiusKm, source: 'OpenStreetMap' };
}