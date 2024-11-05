import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Toaster } from "../ui/toaster";

export function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Toaster />
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
