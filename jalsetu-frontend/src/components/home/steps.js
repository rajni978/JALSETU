import { MapPin, Gauge, HelpCircle, Lightbulb, Megaphone, Landmark, ClipboardList, LineChart } from 'lucide-react';

// The JALSETU journey - this really is a sequence, so numbers are used
export const STEPS = [
  { icon: MapPin, title: 'Select your area', text: 'Choose your block or village area to see its water situation.', to: '/dashboard' },
  { icon: Gauge, title: 'See the water stress', text: 'A score from 0 to 100 shows how much pressure water is under.', to: '/dashboard' },
  { icon: HelpCircle, title: 'Understand why', text: 'Rainfall, groundwater and water bodies are explained one by one.', to: '/dashboard' },
  { icon: Lightbulb, title: 'Know what you can do', text: 'Get simple actions for your home, village and community.', to: '/what-can-i-do' },
  { icon: Megaphone, title: 'Report or suggest', text: 'Report a dry handpump or pond, or suggest a solution.', to: '/report' },
  { icon: Landmark, title: 'Panchayat sees priorities', text: 'Reports and stress are combined into High, Medium and Low priority.', to: '/panchayat' },
  { icon: ClipboardList, title: 'Action is tracked', text: 'Every action moves from Planned to In Progress to Resolved.', to: '/actions' },
  { icon: LineChart, title: 'Results are monitored', text: 'Before and after numbers show whether the work helped.', to: '/monitoring' },
];