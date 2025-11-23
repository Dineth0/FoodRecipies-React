
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import breakfirst from "../../assets/braekfirst.png"
import Lunch from "../../assets/lunch.png"
import Dinner from "../../assets/dinner.png"
import Snacks from "../../assets/snacks.png"
import Desserts from "../../assets/desserts.jpg"
import Beverages from "../../assets/beverages.png"
import Appetizers from "../../assets/Appetizers.png"
import Vegetarian from "../../assets/Vegetarian.png"
import Meats from "../../assets/meats.png"
import SeaFoods from "../../assets/seafoods.png"
import StreetFood from "../../assets/StreetFoods.png"
import Traditional from "../../assets/TraditionalFoods.png"
import { useAuth } from '../../context/AuthContext';


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

export default function Category() {
const navigate = useNavigate()
const {isAuthenticated} = useAuth()

const handleCategoryClick = (catName: string) =>{
  if(!isAuthenticated) {
      navigate("/login")
  }else{
    navigate(`/category/${catName.toLowerCase()}`)
  }
}

  return (
    <section className=' via-[#f9d29d] to-[#f6c07a] py-10 px-6 md:px-20'>
        <h2 className='text-3xl font-bold text-[#2d1b0b] mb-6'>Categories</h2>

        <Swiper
         slidesPerView={4}
         spaceBetween={20}
         freeMode={true}
         grabCursor={true}
         autoplay={{
            delay:900,
            disableOnInteraction: false
         }}
         breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        modules={[FreeMode, Autoplay]}
        className="mySwiper"
        >
            {categories.map((cat, index)=>(
                <SwiperSlide 
                 key={index}
                 onClick={()=> handleCategoryClick(cat.name)}>
                    <div className='text-center cursor-pointer'>
                        <img
                         src={cat.image}
                         alt={cat.name}
                         className='w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md hover:scale-110 transition-transform duration-300'>
                        </img>
                        <p className='mt-2 font-semibold text-[#2d1b0b]'>{cat.name}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </section>
  )
}