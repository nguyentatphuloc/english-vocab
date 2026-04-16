import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function StatisticsChart({ dueCount, soonCount, learnedCount }) {
  const data = [
    { name: 'Ôn hôm nay', value: dueCount },
    { name: 'Sắp tới hạn', value: soonCount },
    { name: 'Tổng đã học', value: learnedCount },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticsChart;
