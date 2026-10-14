import HowItWorksSection from '../components/home/HowItWorksSection';
import Card from '../components/ui/Card';

const FAQ = [
  ['What does the water stress score mean?', 'It shows how much pressure water is under in your area, from 0 (comfortable) to 100 (severe). Higher means more stress.'],
  ['How do I report a problem?', 'Open “Report a problem”, choose your area, the problem type and how urgent it is, then describe it. The Panchayat sees it on their dashboard.'],
  ['What happens after I report?', 'Your report adds to the area’s priority. The Panchayat can plan an action and you can follow it from Planned to In Progress to Resolved.'],
  ['Can I suggest a solution?', 'Yes. In Community, open the Suggestions tab and share an idea such as restoring a pond. Others can support it.'],
];

export default function HowItWorks() {
  return (
    <div className="space-y-10">
      <HowItWorksSection />
      <Card title="User guide">
        <dl className="divide-y divide-slate-100">
          {FAQ.map(([q, a]) => (
            <div key={q} className="py-3">
              <dt className="text-sm font-bold text-navy-900">{q}</dt>
              <dd className="mt-1 text-sm text-slate-600">{a}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}