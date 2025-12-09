import type React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const {user, isAuthenticated, logout} = useAuth()
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
            to="/cotegories"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            CATEGORIES
          </Link>

          <Link
            to="/all-foods"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            FOODS
          </Link>

          <Link
            to="/all-recipes"
            className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300"
          >
            RECIPES
          </Link>

          
        <div>
          {isAuthenticated && user ? (
            <div className="relative group">

              <button className="w-11 h-11 bg-white text-yellow-800 font-semibold rounded-full 
                                flex items-center justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer">
                {user.name.charAt(0).toUpperCase()}
              </button>

              
              <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg rounded-xl text-gray-800 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-300 py-2">

                <div className="w-11 h-11 bg-yellow w-40 h-40 text-yellow-800 font-semibold rounded-full 
                                flex items-center text=md justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer align-center">
                {user.name.charAt(0).toUpperCase()}
              </div>              

                <p className="px-4 py-2 text-sm font-medium border-b">{user.name.split(" ")[0]}</p>

                <Link
                  to="/my-recipes"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Recipes
                </Link>

                <Link
                  to="/my-review"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Reviews
                </Link>

                 <Link
                   to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                 >
                   Profile
                 </Link> 

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-yellow-700 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

          
        </div>
      </div>
    </nav>
  );
};
