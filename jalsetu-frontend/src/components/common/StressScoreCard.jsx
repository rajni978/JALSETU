import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ScoreRing from '../charts/ScoreRing';

const MESSAGE = {
  High: 'Water is running short. Quick action is needed from people and the Panchayat.',
  Medium: 'Water is under pressure. Small steps now can prevent a shortage.',
  Low: 'Water situation is comfortable. Keep protecting it.',
};

export default function StressScoreCard({ area }) {
  const { score, level } = area.stress;
  return (
    <Card title="Water stress score">
      <ScoreRing value={score} level={level} />
      <div className="mt-4 text-center">
        <Badge status={level}>{level} stress in {area.name}</Badge>
        <p className="mt-3 text-sm text-slate-600">{MESSAGE[level]}</p>
        <p className="mt-2 text-xs text-slate-400">Score runs from 0 (no stress) to 100 (severe stress).</p>
      </div>
    </Card>
  );
}