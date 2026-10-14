// Transparent priority logic for Panchayat (shown to users on the dashboard)
//   points = 60% of water stress score + 3 per open report (max 10) + 4 per urgent report (max 5)
export const PRIORITY_RULES = [
  'Water stress score counts for 60% of the points.',
  'Every open community report adds 3 points (up to 10 reports).',
  'Every report marked High urgency adds 4 more points (up to 5 reports).',
  '55 points or more = High, 35 to 54 = Medium, below 35 = Low.',
];

export const priorityLevel = (p) => (p >= 55 ? 'High' : p >= 35 ? 'Medium' : 'Low');

export function computePriority(area, reports = []) {
  const open = reports.filter((r) => r.areaId === area.id && r.status !== 'Resolved');
  const urgent = open.filter((r) => r.urgency === 'High');
  const parts = [
    { label: `Water stress score (${area.stress.score})`, points: Math.round(area.stress.score * 0.6) },
    { label: `${open.length} open report${open.length === 1 ? '' : 's'}`, points: Math.min(open.length, 10) * 3 },
    { label: `${urgent.length} urgent report${urgent.length === 1 ? '' : 's'}`, points: Math.min(urgent.length, 5) * 4 },
  ];
  const points = Math.min(100, parts.reduce((s, p) => s + p.points, 0));
  return { points, level: priorityLevel(points), parts, openCount: open.length, urgentCount: urgent.length };
}