import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Shield, Menu, X, UserCircle } from "lucide-react";
 
export default function Header({
  setTrackModalOpen,
  handleAuthAction,
  isLoggedIn,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();
 
  const hideAuthButtons = location.pathname.includes("/auth");
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <header className="bg-white shadow-sm border-b border-blue-100 top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">GrievancePortal</h1>
            <p className="text-xs text-gray-500">Government Services</p>
          </div>
        </div>
 
        {/* Center Links - Logged In */}
        {isLoggedIn && (
          <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-6 hidden lg:flex">
            <button className="text-gray-700 hover:text-blue-600 font-medium">Add Grievance</button>
            <button className="text-gray-700 hover:text-blue-600 font-medium">My Complaints</button>
            <button
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setTrackModalOpen(true)}
            >
              Track Complaints
            </button>
          </nav>
        )}
 
        {/* Right - Auth or Profile */}
        <div className="flex items-center space-x-3 flex-shrink-0">
 
          {isLoggedIn ? (
            <>
              {/* Profile Icon and Dropdown */}
              <div className="hidden lg:flex items-center relative" ref={dropdownRef}>
                <button
                  className="hover:opacity-80 transition"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <UserCircle className="w-8 h-8 text-gray-700" />
                </button>
 
                {profileDropdownOpen && (
  <div className="absolute right-0 mt-70 w-52 bg-white shadow-lg border border-gray-100 rounded-xl py-2 z-50 animate-fadeIn">
    
    <button className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium transition">
      My Profile
    </button>
 
    <button className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium transition">
      Help
    </button>
 
    <button className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 font-medium transition">
      FAQ
    </button>
 
    <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-semibold transition">
      Logout
    </button>
  </div>
)}
 
 
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setTrackModalOpen(true)}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 hidden lg:inline"
              >
                Track
              </button>
 
              {!hideAuthButtons && (
                <>
                  <button
                    onClick={() => handleAuthAction("login")}
                    className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 hidden lg:inline"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthAction("register")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded hidden lg:inline"
                  >
                    Register
                  </button>
                </>
              )}
            </>
          )}
 
          {/* Hamburger */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
          <nav className="flex flex-col px-4 py-4 space-y-2">
 
            {isLoggedIn ? (
              <>
                <button className="px-4 py-3 rounded hover:bg-blue-50 text-left font-medium text-gray-700">
                  Add Grievance
                </button>
                <button className="px-4 py-3 rounded hover:bg-blue-50 text-left font-medium text-gray-700">
                  My Complaints
                </button>
                <button
                  className="px-4 py-3 rounded hover:bg-blue-50 text-left font-medium text-gray-700"
                  onClick={() => {
                    setTrackModalOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Track Complaints
                </button>
                <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
                  <button className="px-4 py-3 rounded hover:bg-gray-50 text-left text-gray-700">My Profile</button>
                  <button className="px-4 py-3 rounded hover:bg-gray-50 text-left text-gray-700">Help</button>
                  <button className="px-4 py-3 rounded hover:bg-gray-50 text-left text-gray-700">FAQ</button>
                  <button className="px-4 py-3 rounded hover:bg-red-50 text-left text-red-600 font-medium">Logout</button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 mt-2"
                  onClick={() => {
                    setTrackModalOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  Track
                </button>
 
                {!hideAuthButtons && (
                  <>
                    <button
                      className="border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 mt-2"
                      onClick={() => {
                        handleAuthAction("login");
                        setMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded mt-2"
                      onClick={() => {
                        handleAuthAction("register");
                        setMenuOpen(false);
                      }}
                    >
                      Register
                    </button>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}