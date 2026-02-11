import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex bg-cream-50 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
