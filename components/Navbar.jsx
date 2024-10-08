import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export const Navbar = ({ isMenuOpen, toggleMenu, setActiveView }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component renders only on the client
  }, []);

  return (
    <nav className="bg-primary border-b border-gray-700">
      <div className="px-4 py-2 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-200">UIForge</span>

        <div className="flex items-center">
          {/* Mobile menu toggle button */}
          <button onClick={toggleMenu} className="ml-4 p-2 lg:hidden">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-200" />
            )}
          </button>

          {/* Signed in user */}
          {isClient && (
            <>
              <SignedIn>
                <div className="text-white">
                  <UserButton />
                </div>
              </SignedIn>

              {/* Signed out state with Sign In button */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu rendering */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background ">
          <div className="absolute inset-0 flex justify-center p-4">
            <div className="bg-secondary shadow-lg rounded-lg w-full max-w-sm">
              <div className="p-4">
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>

                <nav className="mt-4">
                  <button
                    onClick={() => {
                      toggleMenu();
                      setActiveView("upload");
                    }}
                    className="block px-4 py-2 text-sm text-gray-200"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => {
                      toggleMenu();
                      setActiveView("list");
                    }}
                    className="mt-2 block px-4 py-2 text-sm text-gray-200"
                  >
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
};
