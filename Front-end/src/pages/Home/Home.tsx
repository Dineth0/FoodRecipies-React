import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"
import Category from "../../components/Home/Category"
import { Link } from "react-router-dom"
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Home = () =>{
    return(
        <div className=" bg-fixed  bg-cover bg-center bg-gradient-to-br from-[#fde7c5] via-[#f9d29d] to-[#f6c07a] ">
            <HeroSection/>
            <Category/>
            <div className="className='px-8 md:px-20 py-1">
                <h2 className='text-3xl font-bold text-[#2d1b0b] mb-4'>Some of our Foods</h2>

            </div>

                <FoodCard/>
               
           <div className="flex justify-center pb-20 mt-12">
  <Link
    to="/all-foods"
    className="
      group relative inline-flex items-center gap-3 
      px-8 py-4 rounded-full
      bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#ef4444]
      text-white font-semibold text-lg
      shadow-lg hover:shadow-2xl
      transition-all duration-300 ease-out
      hover:scale-105
      overflow-hidden
    "
  >
    {/* subtle shine effect */}
    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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