import HeroSection from "../../components/Home/HeroSection"
import FoodCard from "../../components/Home/FoodCard"

const Home = () =>{
    return(
        <div className=" bg-fixed  bg-cover bg-center ">
            <HeroSection/>
            <FoodCard/>
        </div>
    )
}
export default Home