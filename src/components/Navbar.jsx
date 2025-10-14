import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserLarge } from "react-icons/fa6";
import { FiSettings, FiLogOut } from "react-icons/fi";
import ProfileSettingsModal from "./ProfileSettingsModal";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  hideSearch = false,
}) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSignOut = () => {
    handleLogout();
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements["movie-search"].value.trim();
    if (query) {
    } else {
      alert("Please enter a search term.");
    }
  };

  // 🔐 Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="backdrop-blur-sm p-4 relative z-50">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={handleSignOut}
            className="text-white text-lg font-bold bg-transparent border-0 cursor-pointer"
          >
            🎬 Movie Recommender
          </button>
          {user ? (
            <div className="flex items-center space-x-4 relative">
              {!hideSearch && (
                <form className="w-[250px]" onSubmit={handleSearch}>
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="movie-search"
                      placeholder="Search for movies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className=" block py-1.5 px-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-transparent placeholder-gray-400"
                    />
                    <div className="absolute top-0 end-0 h-full p-2.5 flex items-center justify-center bg-red-700 rounded-e-lg border border-red-700">
                      <svg
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </form>
              )}
              {/* favorites icon */}
              <Link
                to="/favorites"
                className="relative rounded-full bg-transparent p-1 text-white hover:text-red-700"
              >
                <span className="sr-only">View favorites</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
                  22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </Link>
              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-sm rounded-full bg-transparent focus:outline-none"
                >
                  <FaUserLarge className="text-white text-[20px] cursor-pointer hover:text-red-700" />
                </button>

                {dropdownOpen && user?.name && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-50">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold shadow-md mb-1 mx-auto mt-4">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center text-red-600 text-xl font-bold mb-1 tracking-wide drop-shadow-sm">
                      {user.name}
                    </div>
                    {user.email && (
                      <div className="text-center text-white text-sm mb-3 drop-shadow-sm">
                        {user.email}
                      </div>
                    )}
                    <div className="px-4 py-2 text-gray-600 flex items-center gap-2 text-xs">
                      Manage
                    </div>
                    <button
                      onClick={() => setSettingsOpen(true)}
                      className="w-full px-4 py-2 text-sm text-white hover:bg-red-900 flex items-center gap-2"
                    >
                      <FiSettings />
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-900 flex items-center gap-2"
                    >
                      <FiLogOut />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="text-white px-4 text-lg font-bold">
                Login
              </Link>
              <Link to="/signup" className="text-white px-4 text-lg font-bold">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Modal Profile Settings */}
      <ProfileSettingsModal
        isOpen={settingsOpen}
        setIsOpen={setSettingsOpen}
      />
    </>
  );
}
