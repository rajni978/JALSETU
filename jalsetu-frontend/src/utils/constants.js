export const APP_NAME = 'JALSETU';
export const TAGLINE = 'Know your water. Act before it runs out.';

export const CITIZEN_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/map', label: 'Map' },
  { to: '/what-can-i-do', label: 'What can I do?' },
  { to: '/report', label: 'Report a problem' },
  { to: '/community', label: 'Community' },
];

export const PANCHAYAT_LINKS = [
  { to: '/panchayat', label: 'Panchayat dashboard' },
  { to: '/actions', label: 'Action tracker' },
  { to: '/monitoring', label: 'Monitoring' },
];
export const PANCHAYAT_PATHS = PANCHAYAT_LINKS.map((l) => l.to);


export const REPORT_CATEGORIES = [
  "Drying pond",
  "Falling water level",
  "Broken infrastructure",
  "Suspected contamination",
  "Other",
];


export const INTERVENTION_CATEGORIES = [
  'Pond restoration',
  'Rainwater harvesting',
  'Recharge work',
  'Infrastructure repair',
  'Water conservation',
  'Desilting',
];

// Which Panchayat intervention usually fixes which kind of report
export const REPORT_TO_INTERVENTION = {
  'Dry handpump': 'Infrastructure repair',
  'Dried pond or water body': 'Pond restoration',
  'Dirty or contaminated water': 'Infrastructure repair',
  'Pipeline leakage': 'Infrastructure repair',
  'Water shortage in village': 'Rainwater harvesting',
  Other: 'Water conservation',
};

export const URGENCY_LEVELS = ['Low', 'Medium', 'High'];
export const ACTION_STATUSES = ['Planned', 'In Progress', 'Resolved'];
export const MAP_CENTER = [23.45, 85.1]; // Jharkhand (sample area)