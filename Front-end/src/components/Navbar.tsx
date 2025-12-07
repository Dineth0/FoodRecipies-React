import type React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
       
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-extrabold text-white tracking-wide">
           DON Food<span className="text-yellow-950">ie</span>
          </div>
        </div>

        
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            ABOUT
          </Link>

          <Link
            to="/my-recipes"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            My Recipes
          </Link>

          <Link
            to="/my-review"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            My Reviews
          </Link>
        </div>

       
        <div>
          <Link
            to="/login"
            className="px-5 py-1.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-yellow-700 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
