import type React from "react";
import { Link } from "react-router-dom";


export const Navbar: React.FC = () =>{
    return(
        <nav className="bg-blue-950 shadow-md fixed top-0 left-0 w-full z-50 h-15">
                <div>
                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 text-gray-300 font-medium">
                                <Link to="/" className="hover:text-indigo-400 transition">HOME</Link>
                                <Link to="/about" className="hover:text-indigo-400 transition">ABOUT</Link>
                        </div>

                        <div className="hidden md:flex space-x-4 ml-auto">
                            
                            <Link to="/login" className="px-4 py-1 rounded-full border border-red-400 text-red-400 text-sm hover:bg-red-600 hover:text-white transition">
                                Login
                            </Link>
                        </div> 
                </div>
        </nav>
    )
}