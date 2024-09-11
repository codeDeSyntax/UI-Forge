"use client";
import { useState, useEffect } from "react";
import { UploadForm } from "@/components/Upload";
import { ComponentList } from "@/components/Uicomponents";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import ExploreBanner from "@/components/Explore";

export default function AdminInterface() {
  const [activeView, setActiveView] = useState("upload");
  const [uploadedComponents, setUploadedComponents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

  const handleComponentSubmit = (newComponent) => {
    setUploadedComponents([...uploadedComponents, newComponent]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        // isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        setActiveView={setActiveView}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <main
          className={`flex-1 p-6 transition-transform transform ${
            isSidebarOpen ? "lg:ml-64" : "ml-0"
          } lg:ml-64`}
        >
          <ExploreBanner/>
          {activeView === "upload" && (
            <UploadForm onSubmit={handleComponentSubmit} />
          )}
          {activeView === "list" && (
            <ComponentList components={uploadedComponents} />
          )}
        </main>
      </div>
    </div>
  );
}
