import type React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import breakfirst from "../assets/braekfirst.png"
import Lunch from "../assets/lunch.png"
import Dinner from "../assets/dinner.png"
import Snacks from "../assets/snacks.png"
import Desserts from "../assets/desserts.jpg"
import Beverages from "../assets/beverages.png"
import Appetizers from "../assets/Appetizers.png"
import Vegetarian from "../assets/Vegetarian.png"
import Meats from "../assets/meats.png"
import SeaFoods from "../assets/seafoods.png"
import StreetFood from "../assets/StreetFoods.png"
import Traditional from "../assets/TraditionalFoods.png"



const categories = [
  { name: "Breakfast", image: breakfirst  },
  { name: "Lunch", image:  Lunch},
  { name: "Dinner", image: Dinner },
  { name: "Snacks", image: Snacks },
  { name: "Desserts", image: Desserts },
  { name: "Beverages", image:  Beverages},
  { name: "Appetizers", image:  Appetizers },
  { name: "Vegetarian", image: Vegetarian },
  { name: "Meats", image: Meats },
  { name: "Sea Foods", image: SeaFoods },
  { name: "Street Food", image: StreetFood },
  { name: "Traditional", image: Traditional }
]

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
          
          <div className="relative group">
              <button className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300">
                CATEGORIES
                </button>
                  <div className="absolute left-0 mt-2 w-40 h-120 bg-white shadow-lg rounded-xl 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 py-2 z-50">
                      {categories.map((cat)=>(
                        <Link 
                          key={cat.name}
                          to={`/category/${cat.name.toLowerCase()}`}
                          className="flex items-center px-3 py-2 space-x-1 hover:bg-gray-100 transition">
                            <img src={cat.image} className="w-5 h-5 rounded-full object-cover"></img>
                            <span className="text-sm text-gray-700">{cat.name}</span>
                        </Link>
                      ))}
                  </div>
             
          </div>

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

              <button className="w-11 h-11  text-yellow-800 font-semibold rounded-full 
                                flex items-center justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"/>
                ):(
                  <span className="text-4xl font-semibold text-yellow-800">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span> 
                )}
              </button>

              
              <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg rounded-xl text-gray-800 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-300 py-4 z-50 ">

                <div className="mx-auto w-24 h-24 bg-yellow w-40 h-40 text-yellow-800 font-semibold rounded-full 
                                flex items-center text=md justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer align-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"/>
                ):(
                  <span className="text-4xl font-semibold text-yellow-800">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span> 
                )}
                </div>              

                <p className="px-4 py-2 text-sm text-center font-medium border-b">{user.name.split(" ")[0]}</p>

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
