import StatisticsChart from './StatisticsChart';

function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-xl p-4 text-white shadow ${color}`}>
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Dashboard({ stats, chartData }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Due today" value={stats.dueToday} color="bg-red-500" />
        <StatCard title="Due soon" value={stats.upcoming} color="bg-orange-500" />
        <StatCard title="Total words" value={stats.total} color="bg-blue-600" />
        <StatCard title="Progress" value={`${stats.progress}%`} color="bg-emerald-600" />
      </div>
      <StatisticsChart data={chartData} />
    </div>
  );
}

export default Dashboard;
