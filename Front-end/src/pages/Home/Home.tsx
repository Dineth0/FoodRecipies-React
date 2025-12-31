import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"
import Category from "../../components/Home/Category"

const Home = () =>{
    return(
        <div className=" bg-fixed  bg-cover bg-center bg-gradient-to-br from-[#fde7c5] via-[#f9d29d] to-[#f6c07a] ">
            <HeroSection/>
            <Category/>
            <div className="className='px-8 md:px-20 py-1">
                <h2 className='text-3xl font-bold text-[#2d1b0b] mb-4'>Some of our Foods</h2>

            </div>

                <FoodCard/>
               
           
        </div>
    )
}
export default Home