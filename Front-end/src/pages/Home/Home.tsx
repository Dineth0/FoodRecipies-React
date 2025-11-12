import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"
import Category from "../../components/Home/Category"

const Home = () =>{
    return(
        <div className=" bg-fixed  bg-cover bg-center ">
            <HeroSection/>
            <Category/>
                <FoodCard/>
           
        </div>
    )
}
export default Home