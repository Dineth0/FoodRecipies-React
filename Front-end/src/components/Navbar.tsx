import type React from "react";
import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/slices/authSlice";


import breakfirst from "../assets/braekfirst.png";
import Lunch from "../assets/lunch.png";
import Dinner from "../assets/dinner.png";
import Snacks from "../assets/snacks.png";
import Desserts from "../assets/desserts.jpg";
import Beverages from "../assets/beverages.png";
import Appetizers from "../assets/Appetizers.png";
import Vegetarian from "../assets/Vegetarian.png";
import Meats from "../assets/meats.png";
import SeaFoods from "../assets/seafoods.png";
import StreetFood from "../assets/StreetFoods.png";
import Traditional from "../assets/TraditionalFoods.png";
import type { RootState, AppDisPatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";

const categories = [
  { name: "Breakfast", image: breakfirst },
  { name: "Lunch", image: Lunch },
  { name: "Dinner", image: Dinner },
  { name: "Snacks", image: Snacks },
  { name: "Desserts", image: Desserts },
  { name: "Beverages", image: Beverages },
  { name: "Appetizers", image: Appetizers },
  { name: "Vegetarian", image: Vegetarian },
  { name: "Meats", image: Meats },
  { name: "Sea Foods", image: SeaFoods },
  { name: "Street Food", image: StreetFood },
  { name: "Traditional", image: Traditional },
];

export const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDisPatch>();
  const navigate = useNavigate();
  
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction());
    setIsMobileMenuOpen(false); 
    navigate("/login");
  };

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileCategoryOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          
     
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
              DON Food<span className="text-yellow-950">ie</span>
            </Link>
          </div>

         
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300">
              HOME
            </Link>

            <div className="relative group">
              <button className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300 cursor-pointer">
                CATEGORIES
              </button>
              <div className="absolute left-0 mt-2 w-48 max-h-96 overflow-y-auto bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/category/${cat.name.toLowerCase()}`}
                    className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 transition"
                  >
                    <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/all-foods" className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300">
              FOODS
            </Link>

            <Link to="/all-recipes" className="text-white text-lg font-semibold hover:text-yellow-950 transition duration-300">
              RECIPES
            </Link>

           
            <div>
              {isAuthenticated && user ? (
                <div className="relative group">
                  <button className="w-11 h-11 bg-white text-yellow-800 font-semibold rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </button>

                  <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg rounded-xl text-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-4 z-50">
                    <div className="flex flex-col items-center justify-center mb-2">
                       <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 mb-2">
                          {user.image ? (
                            <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-yellow-100 flex items-center justify-center text-2xl font-bold text-yellow-800">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                       </div>
                       <p className="px-4 text-sm text-center font-bold text-gray-700">{user.name}</p>
                    </div>
                    
                    <hr className="border-gray-200 my-1"/>
                    
                    <Link to="/my-recipes" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">My Recipes</Link>
                    <Link to="/my-review" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">My Reviews</Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" onClick={handleLogin} className="px-5 py-1.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-yellow-700 transition duration-300">
                  Login
                </Link>
              )}
            </div>
          </div>

        
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

    
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl rounded-b-2xl overflow-hidden transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            
    
            {isAuthenticated && user && (
                <div className="flex items-center space-x-3 mb-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-yellow-500">
                        {user.image ? (
                             <img src={user.image} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-800">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            )}

            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md">
              HOME
            </Link>

          
            <div>
                <button 
                    onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md"
                >
                    <span>CATEGORIES</span>
                    <svg className={`w-4 h-4 transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {isMobileCategoryOpen && (
                    <div className="pl-6 mt-1 space-y-1 max-h-60 overflow-y-auto">
                        {categories.map((cat) => (
                            <Link 
                                key={cat.name} 
                                to={`/category/${cat.name.toLowerCase()}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-yellow-600"
                            >
                                <img src={cat.image} className="w-5 h-5 rounded-full mr-2 object-cover"/>
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Link to="/all-foods" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md">
              FOODS
            </Link>

            <Link to="/all-recipes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-yellow-600 hover:bg-gray-50 rounded-md">
              RECIPES
            </Link>

            <hr className="my-2 border-gray-200" />

            {isAuthenticated ? (
               <>
                 <Link to="/my-recipes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600">My Recipes</Link>
                 <Link to="/my-review" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600">My Reviews</Link>
                 <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600">Profile</Link>
                 <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">Logout</button>
               </>
            ) : (
                <Link to="/login" onClick={handleLogin} className="block w-full text-center px-4 py-2 mt-4 bg-yellow-500 text-white font-bold rounded-lg shadow hover:bg-yellow-600 transition">
                    Login
                </Link>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};