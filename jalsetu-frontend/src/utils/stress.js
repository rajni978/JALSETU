// TEMPORARY water stress logic (frontend copy).
// Final formula = Rajni's. When backend sends `area.stress`, that is used instead
// (see withStress in services/areaApi.js). Weights: rainfall 35%, groundwater 40%, water bodies 25%.

export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));
export const stressLevel = (score) => (score >= 60 ? 'High' : score >= 35 ? 'Medium' : 'Low');

export function computeStress(a) {
  const { rainfall, groundwater, waterBodies } = a;

  const deficit = Math.max(0, ((rainfall.normal - rainfall.actual) / rainfall.normal) * 100);
  const gwChange = groundwater.depth - groundwater.prevDepth;
  const driedPct = (waterBodies.dried / waterBodies.total) * 100;

  const raw = [
    {
      key: 'groundwater', label: 'Groundwater', weight: 40,
      risk: clamp(((groundwater.depth - 5) / 15) * 100),
      value: `${groundwater.depth} m below ground`,
      why: `Water is ${groundwater.depth} m below the ground${gwChange > 0.1 ? `, ${gwChange.toFixed(1)} m deeper than last year` : ', about the same as last year'}. Deeper water means wells and handpumps dry up sooner.`,
    },
    {
      key: 'rainfall', label: 'Rainfall', weight: 35,
      risk: clamp((deficit / 40) * 100),
      value: `${rainfall.actual} mm of ${rainfall.normal} mm normal`,
      why: deficit > 1
        ? `Rainfall is ${deficit.toFixed(0)}% below normal, so less water reaches ponds and recharges groundwater.`
        : 'Rainfall is at or above normal this season.',
    },
    {
      key: 'waterBodies', label: 'Water bodies', weight: 25,
      risk: clamp(driedPct),
      value: `${waterBodies.dried} of ${waterBodies.total} dry`,
      why: `${waterBodies.dried} of ${waterBodies.total} ponds and tanks (${driedPct.toFixed(0)}%) are dry or almost dry.`,
    },
  ];

  const factors = raw.map((f) => ({ ...f, points: Math.round((f.risk * f.weight) / 100), level: stressLevel(f.risk) }));
  const score = Math.round(raw.reduce((s, f) => s + (f.risk * f.weight) / 100, 0));
  return { score, level: stressLevel(score), factors };
}