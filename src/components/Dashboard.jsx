import StatisticsChart from './StatisticsChart';

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-lg p-4 text-white ${color}`}>
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Dashboard({ stats }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Cần ôn hôm nay" value={stats.dueToday} color="bg-red-500" />
        <StatCard label="Sắp tới hạn" value={stats.dueSoon} color="bg-orange-500" />
        <StatCard label="Tổng từ đã học" value={stats.total} color="bg-blue-600" />
        <StatCard label="Tiến độ" value={`${stats.progress}%`} color="bg-green-600" />
      </div>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Biểu đồ thống kê</h3>
        <StatisticsChart dueCount={stats.dueToday} soonCount={stats.dueSoon} learnedCount={stats.total} />
      </div>
    </div>
  );
}

export default Dashboard;
