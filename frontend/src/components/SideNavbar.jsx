import { Link } from "react-router-dom";
import { useState } from "react";

import { Home, Settings, Building, ListTodo, Factory } from "lucide-react";

const SideNavbar = () => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        <Link to="/admin" className="block px-4 py-2 hover:bg-gray-700">
          <div className="flex gap-2">
            <Home /> Dashboard
          </div>
        </Link>

        {/* Company Dropdown */}
        <div>
          <button
            onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            className="flex items-center justify-between px-4 py-2 w-full text-left hover:bg-gray-700"
          >
            <span className="flex gap-2">
              <Building />
              Company
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transform transition-transform ${
                isCompanyDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isCompanyDropdownOpen && (
            <div className="ml-4 mt-1">
              <Link
                to="/admin/pending_requests"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                <div className="flex gap-2">
                  <ListTodo /> Pending Approvals
                </div>
              </Link>
              <Link
                to="/admin/companies"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                <div className="flex gap-2">
                  <Factory /> All Companies
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/admin/settings"
          className="block px-4 py-2 hover:bg-gray-700"
        >
          <div className="flex gap-2">
            <Settings /> Settings
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default SideNavbar;
