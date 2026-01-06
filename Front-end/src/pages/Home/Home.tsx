import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"
import Category from "../../components/Home/Category"
import { Link } from "react-router-dom"
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Home = () =>{
   return (
        <div
            className="
                min-h-screen
                bg-gradient-to-b
                from-[#A27B5C]   
                via-[#AB886D]   
                to-[#23120b]    
            "
        >
            <HeroSection />
            <Category />

            <div className="px-8 md:px-20 py-10">
                <h2 className="text-3xl font-bold text-[#f3e8dd] tracking-wide">
                    Some of our Foods
                </h2>
                <div className="w-20 h-1 bg-[#f59e0b] mt-2 rounded-full"></div> {/* පොඩි underline එකක් */}
            </div>

            <FoodCard />

            <div className="flex justify-center pb-20 mt-12">
                <Link
                    to="/all-foods"
                    className="
                        group relative inline-flex items-center gap-3 
                        px-8 py-4 rounded-full
                        bg-gradient-to-r from-[#b45309] to-[#d97706]
                        text-white font-semibold text-lg
                        shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                        hover:shadow-[#b45309]/40
                        transition-all duration-300 ease-out
                        hover:scale-105
                        overflow-hidden
                    "
                >
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover:mr-2 transition-all duration-300">
                        See All Foods
                    </span>
                    <HiOutlineArrowLongRight className="relative z-10 text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                </Link>
            </div>
        </div>
    )
}
export default Home