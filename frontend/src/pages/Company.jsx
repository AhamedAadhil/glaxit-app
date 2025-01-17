import { useEffect, useState } from "react";
import axios from "axios";

const Company = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/company/profile",

        { withCredentials: true }
      );
      const data = response.data.data;

      console.log(response, "resp");
      if (response.data.success) {
        setCompanyInfo(data);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    if (response.data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      window.location.reload();
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  console.log(companyInfo, "com info");

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

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
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
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
        {companyInfo && (
          <div className="bg-white shadow-md rounded p-6">
            <p className="text-gray-700">
              <strong>Company ID:</strong> {companyInfo.company_id}
            </p>
            <p className="text-gray-700">
              <strong>Company Name:</strong> {companyInfo.company_name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {companyInfo.company_email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {companyInfo.company_address}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Company;
