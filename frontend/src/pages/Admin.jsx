import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-bold text-xl">Admin Panel</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/pending_requests"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Pending Approvels
              </Link>
              <Link
                to="/companies"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Companies
              </Link>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Admin
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
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="text-gray-700">
          Use the navigation bar to manage the system.
        </p>
      </main>
    </div>
  );
};

export default Admin;
