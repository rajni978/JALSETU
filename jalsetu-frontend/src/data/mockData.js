// SAMPLE DATA for demo (coordinates approximate). Replace with backend later via services/.
export const areas = [
  { id: 'ormanjhi', name: 'Ormanjhi', district: 'Ranchi', lat: 23.43, lng: 85.46, population: 18400, rainfall: { actual: 780, normal: 1100 }, groundwater: { depth: 14.2, prevDepth: 12.8 }, waterBodies: { total: 24, active: 14, dried: 10 } },
  { id: 'angara', name: 'Angara', district: 'Ranchi', lat: 23.25, lng: 85.45, population: 22100, rainfall: { actual: 950, normal: 1100 }, groundwater: { depth: 9.5, prevDepth: 9.1 }, waterBodies: { total: 18, active: 14, dried: 4 } },
  { id: 'kanke', name: 'Kanke', district: 'Ranchi', lat: 23.41, lng: 85.3, population: 41000, rainfall: { actual: 1020, normal: 1100 }, groundwater: { depth: 7.8, prevDepth: 7.6 }, waterBodies: { total: 30, active: 26, dried: 4 } },
  { id: 'lohardaga', name: 'Lohardaga Sadar', district: 'Lohardaga', lat: 23.44, lng: 84.68, population: 15300, rainfall: { actual: 690, normal: 1050 }, groundwater: { depth: 17.6, prevDepth: 15.9 }, waterBodies: { total: 20, active: 9, dried: 11 } },
  { id: 'gumla', name: 'Gumla', district: 'Gumla', lat: 23.04, lng: 84.54, population: 19800, rainfall: { actual: 880, normal: 1150 }, groundwater: { depth: 11.4, prevDepth: 10.6 }, waterBodies: { total: 26, active: 17, dried: 9 } },
  { id: 'barkagaon', name: 'Barkagaon', district: 'Hazaribagh', lat: 23.8, lng: 85.35, population: 16700, rainfall: { actual: 820, normal: 1200 }, groundwater: { depth: 12.9, prevDepth: 11.7 }, waterBodies: { total: 22, active: 13, dried: 9 } },
];

// Monsoon months: share of normal vs actual rain
const NORMAL_SHARE = [0.16, 0.3, 0.3, 0.24];
const ACTUAL_SHARE = [0.12, 0.26, 0.34, 0.28];
const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep'];

export const rainfallSeries = (a) =>
  MONTHS.map((month, i) => ({
    month,
    normal: Math.round(a.rainfall.normal * NORMAL_SHARE[i]),
    actual: Math.round(a.rainfall.actual * ACTUAL_SHARE[i]),
  }));

export const groundwaterSeries = (a) =>
  ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, i) => ({
    month,
    depth: +(a.groundwater.prevDepth + (a.groundwater.depth - a.groundwater.prevDepth) * (i / 5) + Math.sin(i * 2) * 0.15).toFixed(1),
  }));

// "What can I do?" - practical actions by stress level
export const actionsByLevel = {
  High: [
    { id: 'h1', who: 'At home', title: 'Store water in covered containers', text: 'Fill clean, covered containers when water comes. Keep the drinking water separate from water for washing.' },
    { id: 'h2', who: 'At home', title: 'Reuse water wherever you can', text: 'Use water from washing vegetables and clothes for plants or cleaning floors.' },
    { id: 'h3', who: 'In your village', title: 'Report dry handpumps and ponds', text: 'Every report helps the Panchayat decide where to work first. Use the Report a problem page.' },
    { id: 'h4', who: 'With the community', title: 'Ask for a pond or tank cleaning drive', text: 'Desilting a pond before the next rain helps it hold more water.' },
    { id: 'h5', who: 'With the community', title: 'Build recharge pits near handpumps', text: 'Small pits let rain soak into the ground and raise the water level around handpumps.' },
  ],
  Medium: [
    { id: 'm1', who: 'At home', title: 'Fix leaking taps and pipes', text: 'A tap dripping once a second wastes more than 10 litres a day.' },
    { id: 'm2', who: 'In your village', title: 'Keep ponds and drains clean', text: 'Do not dump waste in or near ponds. Clean drains so rain reaches the ponds.' },
    { id: 'm3', who: 'With the community', title: 'Suggest rainwater harvesting', text: 'Roofs of schools and the Panchayat building can feed a tank or recharge pit.' },
    { id: 'm4', who: 'With the community', title: 'Plan a pond restoration', text: 'Suggest which pond needs repair so it can be added to the Panchayat plan.' },
  ],
  Low: [
    { id: 'l1', who: 'At home', title: 'Keep saving water', text: 'Turn off taps while brushing or washing. Small habits keep stress low.' },
    { id: 'l2', who: 'In your village', title: 'Protect ponds and recharge areas', text: 'Keep water bodies free from waste so they stay healthy.' },
    { id: 'l3', who: 'With the community', title: 'Share what works', text: 'Post your village’s good water practices in Community so others can follow.' },
  ],
};

export const seedReports = [
  { id: 'r1', areaId: 'ormanjhi', village: 'Barki', category: 'Dried pond or water body', urgency: 'High', description: 'The main village pond has been dry since August. Cattle have nowhere to drink.', name: 'Sunita D.', date: '2026-10-05T09:00:00', status: 'Reported' },
  { id: 'r2', areaId: 'ormanjhi', village: 'Chutupalu', category: 'Dry handpump', urgency: 'High', description: 'Handpump near the school gives no water. Children carry water from far away.', name: 'Ramesh M.', date: '2026-10-06T11:30:00', status: 'Reported' },
  { id: 'r3', areaId: 'ormanjhi', village: 'Barki', category: 'Water shortage in village', urgency: 'Medium', description: 'Water supply comes only every third day for about one hour.', name: 'Anita K.', date: '2026-10-07T08:15:00', status: 'Reported' },
  { id: 'r4', areaId: 'ormanjhi', village: 'Nawadih', category: 'Pipeline leakage', urgency: 'Low', description: 'Pipe near the main road leaks continuously and water goes to waste.', name: 'Ajay P.', date: '2026-10-07T16:45:00', status: 'Reported' },
  { id: 'r5', areaId: 'lohardaga', village: 'Kuru Road', category: 'Dry handpump', urgency: 'High', description: 'Three handpumps in the ward are dry. People depend on one tanker.', name: 'Shabnam A.', date: '2026-10-04T10:00:00', status: 'Action Planned' },
  { id: 'r6', areaId: 'lohardaga', village: 'Senha', category: 'Dried pond or water body', urgency: 'Medium', description: 'Pond has filled with mud and does not hold water after rain.', name: 'Dinesh O.', date: '2026-10-06T13:20:00', status: 'Reported' },
  { id: 'r7', areaId: 'gumla', village: 'Bazar tand', category: 'Water shortage in village', urgency: 'Medium', description: 'Wells go dry by March every year. Need a long-term solution.', name: 'Pooja T.', date: '2026-10-03T09:40:00', status: 'Action Planned' },
  { id: 'r8', areaId: 'kanke', village: 'Gonda', category: 'Dirty or contaminated water', urgency: 'Medium', description: 'Tap water looks brown in the morning for the last two days.', name: 'Rohit S.', date: '2026-10-08T07:50:00', status: 'Reported' },
];

export const seedSuggestions = [
  { id: 's1', areaId: 'ormanjhi', title: 'Restore Barki village pond', category: 'Pond restoration', description: 'Deepen the pond, repair the bund and clear the inlet channel before next monsoon.', name: 'Sunita D.', votes: 34, date: '2026-10-05T10:00:00' },
  { id: 's2', areaId: 'lohardaga', title: 'Repair handpumps near Kuru Road', category: 'Infrastructure repair', description: 'Three handpumps need new pipes and platforms. Cost is small compared to tanker supply.', name: 'Shabnam A.', votes: 27, date: '2026-10-04T12:00:00' },
  { id: 's3', areaId: 'gumla', title: 'Recharge pits at Bazar tand', category: 'Recharge work', description: 'Dig recharge pits along the drain so rain water sinks into the ground.', name: 'Pooja T.', votes: 18, date: '2026-10-03T11:00:00' },
  { id: 's4', areaId: 'kanke', title: 'Clean the community water tank', category: 'Water conservation', description: 'The overhead tank near the market has not been cleaned in months.', name: 'Rohit S.', votes: 12, date: '2026-10-08T09:00:00' },
];

export const seedActions = [
  { id: 'a1', areaId: 'ormanjhi', title: 'Desilt Chutupalu pond', category: 'Desilting', priority: 'High', status: 'Resolved', reportId: null, notes: 'Completed with MGNREGA labour. Pond now holds water after rain.', createdAt: '2026-08-20T10:00:00', history: [{ status: 'Planned', date: '2026-08-20T10:00:00' }, { status: 'In Progress', date: '2026-09-01T10:00:00' }, { status: 'Resolved', date: '2026-09-22T10:00:00' }] },
  { id: 'a2', areaId: 'lohardaga', title: 'Repair handpumps – Kuru Road', category: 'Infrastructure repair', priority: 'High', status: 'In Progress', reportId: 'r5', notes: 'Material ordered. Work starts this week.', createdAt: '2026-10-05T10:00:00', history: [{ status: 'Planned', date: '2026-10-05T10:00:00' }, { status: 'In Progress', date: '2026-10-08T10:00:00' }] },
  { id: 'a3', areaId: 'gumla', title: 'Rainwater harvesting – Bazar tand', category: 'Rainwater harvesting', priority: 'Medium', status: 'Planned', reportId: 'r7', notes: 'Survey done. Waiting for fund approval.', createdAt: '2026-10-06T10:00:00', history: [{ status: 'Planned', date: '2026-10-06T10:00:00' }] },
];

// Before / after results for completed work (demo data)
export const seedMonitoring = [
  { id: 'mo1', areaId: 'ormanjhi', actionTitle: 'Desilt Chutupalu pond', metric: 'Days the pond holds water after rain', unit: 'days', before: 18, after: 41, lowerIsBetter: false, date: '2026-10-01T10:00:00' },
  { id: 'mo2', areaId: 'ormanjhi', actionTitle: 'Desilt Chutupalu pond', metric: 'Handpump water level nearby', unit: 'm below ground', before: 14.2, after: 12.9, lowerIsBetter: true, date: '2026-10-01T10:00:00' },
  { id: 'mo3', areaId: 'ormanjhi', actionTitle: 'Desilt Chutupalu pond', metric: 'Reports from this village', unit: 'per month', before: 6, after: 2, lowerIsBetter: true, date: '2026-10-01T10:00:00' },
];