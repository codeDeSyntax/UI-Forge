import { Menu, X, Moon, Sun } from "lucide-react";

export const Navbar = ({ isDarkMode, toggleDarkMode, isMenuOpen, toggleMenu,setActiveView }) => (
  <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
    <div className="px-4 py-2 flex justify-between items-center">
      <span className="text-lg font-bold text-gray-800 dark:text-white">AdminUI</span>
      
      <div className="flex items-center">
        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode} className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>

        {/* Mobile menu toggle button */}
        <button onClick={toggleMenu} className="ml-4 p-2 lg:hidden">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>

    {/* Mobile menu rendering */}
    {isMenuOpen && (
      <div className="lg:hidden fixed inset-0 z-50 bg-gray-600 bg-opacity-75">
        <div className="absolute inset-0 flex justify-center p-4">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-sm">
            <div className="p-4">
              <button onClick={toggleMenu} className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100">
                <X className="h-6 w-6" />
              </button>

              <nav className="mt-4">
                <button onClick={() =>{ toggleMenu(); setActiveView('upload');}} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  Upload
                </button>
                <button onClick={() =>{toggleMenu(); setActiveView('list');}} className="mt-2 block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  Components
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )}
  </nav>
);
