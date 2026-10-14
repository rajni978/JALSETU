import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// data: [{ month, normal, actual }]
export default function RainfallChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ left: -15 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} unit=" mm" />
        <Tooltip cursor={{ fill: '#ecfbfd' }} formatter={(v) => `${v} mm`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="normal" name="Normal rainfall" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
        <Bar dataKey="actual" name="Actual rainfall" fill="#12a9c4" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}