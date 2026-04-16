import Dashboard from '../components/Dashboard';

function DashboardPage({ stats, chartData }) {
  return <Dashboard stats={stats} chartData={chartData} />;
}

export default DashboardPage;
