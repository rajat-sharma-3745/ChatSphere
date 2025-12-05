import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./common/Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-full md:h-auto w-64 md:w-72 bg-white border-r border-gray-200 shadow-md md:shadow-none  flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
          }`}
        >
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 overflow-y-auto md:ml-0">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
