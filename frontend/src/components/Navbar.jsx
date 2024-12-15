import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Home, Calendar, Users, CalendarDays, LogOut, GraduationCap, Settings, User } from "lucide-react";

const Navbar = () => {

  const [isDashboardOpen, setDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />


              </div>
              <h1 className="text-lg font-bold">FORUM</h1>
            </Link>
          </div>

          {/* Center Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/forumCommun" className="flex items-center gap-2 text-base text-gray-700 hover:text-primary transition-all">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/calendar" className="flex items-center gap-2 text-base text-gray-700 hover:text-primary transition-all">
              <CalendarDays className="w-5 h-5" />
              <span>Calendrier</span>
            </Link>
            <Link to="/clubs" className="flex items-center gap-2 text-base text-gray-700 hover:text-primary transition-all">
              <Users className="w-5 h-5" />
              <span>Clubs</span>
            </Link>
            <Link to="/events" className="flex items-center gap-2 text-base text-gray-700 hover:text-primary transition-all">
              <Calendar className="w-5 h-5" />
              <span>Événements</span>
            </Link>
          </nav>

          {/* Right side: Profile and Dashboard */}
          <div className="relative flex items-center gap-2">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={ "/avatar.png"} // Dynamically load profile image
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={toggleDashboard}
              />
              {isDashboardOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;