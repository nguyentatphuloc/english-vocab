import Dashboard from '../components/Dashboard';

function DashboardPage({ stats }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">Dashboard</h2>
      <Dashboard stats={stats} />
    </section>
  );
}

export default DashboardPage;
