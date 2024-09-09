import { Menu } from "lucide-react";

export const Sidebar = ({ activeView, setActiveView, isSidebarOpen, toggleSidebar }) => (
  <div className={`fixed top-0 left-0 lg:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} z-40 lg:z-auto`}>
    <div className="p-4">
      {/* Toggle Button for mobile view */}
      <button onClick={toggleSidebar} className="lg:hidden text-gray-400 mb-4">
        <Menu className="h-6 w-6" />
      </button>
      <nav className="mt-4">
        <button onClick={() => setActiveView("upload")} className={`block px-4 py-2 text-sm ${activeView === "upload" ? "bg-indigo-100 dark:bg-indigo-700" : ""}`}>
          Upload
        </button>
        <button onClick={() => setActiveView("list")} className={`mt-2 block px-4 py-2 text-sm ${activeView === "list" ? "bg-indigo-100 dark:bg-indigo-700" : ""}`}>
          Components
        </button>
      </nav>
    </div>
  </div>
);
