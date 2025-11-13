import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"
import Category from "../../components/Home/Category"
import Footer from "../../components/Footer"

const Home = () =>{
    return(
        <div className=" bg-fixed  bg-cover bg-center bg-gradient-to-br from-[#fde7c5] via-[#f9d29d] to-[#f6c07a] ">
            <HeroSection/>
            <Category/>
                <FoodCard/>
            <Footer/>    
           
        </div>
    )
}
export default Home