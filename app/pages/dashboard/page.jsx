"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Upload,
  Tag,
  Search,
  Plus,
  LayoutGrid,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const techStacks = [
  "React",
  "React Native",
  "Vue.js",
  "Angular",
  "Next.js",
  "Svelte",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Laravel",
  "Spring Boot",
  "ASP.NET Core",
  "GraphQL",
  "Apollo",
  "Redux",
  "MobX",
  "Webpack",
  "Rollup",
  "Vite",
  "Jest",
  "Cypress",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
];

export default function AdminInterface() {
  const [activeView, setActiveView] = useState("upload");
  const [componentName, setComponentName] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [componentImage, setComponentImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [uploadedComponents, setUploadedComponents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleImageUpload = (e) => {
    setComponentImage(e.target.files[0]);
  };

  const handleTagAdd = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComponent = { componentName, componentCode, componentImage, tags };
    setUploadedComponents([...uploadedComponents, newComponent]);
    setComponentName("");
    setComponentCode("");
    setComponentImage(null);
    setTags([]);
  };

  const UploadForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label htmlFor="componentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Component Name
        </label>
        <input
          type="text"
          id="componentName"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="componentCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Component Code
        </label>
        <textarea
          id="componentCode"
          value={componentCode}
          onChange={(e) => setComponentCode(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="componentImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Component Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors duration-200 dark:border-gray-600 dark:hover:border-indigo-400">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="componentImage"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="componentImage"
                  name="componentImage"
                  type="file"
                  className="sr-only"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="tags"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add tags"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white dark:hover:bg-indigo-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Upload Component
        </button>
      </div>
    </form>
  );

  const ComponentList = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {uploadedComponents.map((component, index) => (
        <div key={index} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            {component.componentName}
          </h3>
          <div className="mb-4">
            {component.componentImage && (
              <img
                src="/api/placeholder/400/300"
                alt={component.componentName}
                className="w-full h-40 object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {component.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-auto">
            <code>{component.componentCode}</code>
          </pre>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div
          className={`lg:w-64 lg:flex-shrink-0 ${isSidebarOpen ? "block" : "hidden lg:block"} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden inline-flex items-center p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <nav className="mt-4">
              <button
                onClick={() => setActiveView("upload")}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === "upload"
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`mt-2 block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === "list"
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                Components
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {/* Navbar */}
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  AdminUI
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                  </button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 lg:hidden">
              <div className="absolute inset-0 flex justify-center p-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-sm">
                  <div className="flex justify-between items-center p-4">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      AdminUI
                    </span>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    <button
                      onClick={() => setActiveView("upload")}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeView === "upload"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      Upload
                    </button>
                    <button
                      onClick={() => setActiveView("list")}
                      className={`mt-2 block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        activeView === "list"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      Components
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main content area */}
          <main className="p-4 sm:p-6">
            {activeView === "upload" && <UploadForm />}
            {activeView === "list" && <ComponentList />}
          </main>
        </div>
      </div>
    </div>
  );
}
