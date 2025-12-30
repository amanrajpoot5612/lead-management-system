import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed, non-scrollable */}
      <Sidebar />

      {/* Right section */}
      <div className="flex flex-col flex-1">
        {/* Header - fixed */}
        <Header />

        {/* Main content - ONLY scrollable area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
