import React from "react";
import {
  Menu,
  Upload,
  List,
  Settings,
  Users,
  BarChart,
  HelpCircle,
} from "lucide-react";

export const Sidebar = ({
  activeView,
  setActiveView,
  isSidebarOpen,
  toggleSidebar,
}) => (
  <div
    className={`fixed top-0 left-0 lg:w-64 bg-accent text-white h-screen transition-transform transform  ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    } z-40 lg:z-auto`}
  >
    <div className="p-4 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={toggleSidebar} className="lg:hidden text-gray-400">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="space-y-2">
        <SidebarItem
          icon={Upload}
          label="Upload Component"
          isActive={activeView === "upload"}
          onClick={() => setActiveView("upload")}
        />
        <SidebarItem
          icon={List}
          label="Component List"
          isActive={activeView === "list"}
          onClick={() => setActiveView("list")}
        />
        <SidebarItem
          icon={Users}
          label="User Management"
          isActive={activeView === "users"}
          onClick={() => setActiveView("users")}
        />
        <SidebarItem
          icon={BarChart}
          label="Analytics"
          isActive={activeView === "analytics"}
          onClick={() => setActiveView("analytics")}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeView === "settings"}
          onClick={() => setActiveView("settings")}
        />
      </nav>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <SidebarItem
        icon={HelpCircle}
        label="Help & Support"
        onClick={() => setActiveView("help")}
      />
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Sidebar;
