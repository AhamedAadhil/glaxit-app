import { useState } from "react";

const Company = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-bold text-xl">Company Portal</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <a
                href="#dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-500"
              >
                Dashboard
              </a>
              <a
                href="#projects"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-500"
              >
                Projects
              </a>
              <a
                href="#invoices"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-500"
              >
                Invoices
              </a>
              <a
                href="#support"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-500"
              >
                Support
              </a>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-green-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-500"
              >
                Company
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Company Portal
        </h1>
        <p className="text-gray-700">
          Use the navigation bar to manage your company-related activities.
        </p>
      </main>
    </div>
  );
};

export default Company;
