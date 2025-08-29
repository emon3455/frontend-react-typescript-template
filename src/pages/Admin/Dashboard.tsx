

const Dashboard = () => {

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div id="admin-dashboard">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            System revenue summary and user/transaction analytics.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
