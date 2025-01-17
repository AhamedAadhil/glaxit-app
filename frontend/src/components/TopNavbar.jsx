import { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogout } from "../../utils/handleLogout";

const TopNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUserEmail = localStorage.getItem("email");

  return (
    <nav className="bg-gray-800 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="font-bold text-xl"></span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className=" bg-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
            >
              <div className="flex gap-2 justify-center items-center">
                <img
                  className="inline-block size-6 rounded-full ring-2 ring-white"
                  src={
                    currentUserEmail === "4dm1n@example.com"
                      ? "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg/1200px-M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"
                  }
                />
                <span>{currentUserEmail}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transform transition-transform ${
                    menuOpen ? "rotate-180" : "rotate-0"
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
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
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
  );
};

export default TopNavbar;
