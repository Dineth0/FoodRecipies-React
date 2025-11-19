import { useEffect, useState } from "react"
import {  getFoodByName } from "../../services/FoodAPI"
import { useNavigate, useParams } from "react-router-dom"

interface Food{
    _id: string
  name: string
  category: string
  cuisine: string
  description: string
  images: string[]
}
export default function FoodPage() {
    const {name} = useParams<{name : string}>()
    const [food , setFood] = useState<Food| null>(null)
    const [activeImage, setActiveImage] = useState<string>("")
    const navigate = useNavigate()
    useEffect(() =>{
        if(!name) return
        const fetchFood = async()=>{
            try{
                const response = await getFoodByName(name)
                console.log(response.data)
                const foodDetail = response.data.data.food
                setFood(foodDetail)
                if(foodDetail.images.length > 0){
                    setActiveImage(foodDetail.images[0])
                }
            }catch(error){
                console.error(error)
            }
        }
        fetchFood()
    },[name])
        if (!food) {
        return <p className="p-10">Loading...</p>
    }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
    
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-orange-600 transition-colors font-medium"
        >
          ← Back to Menu
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden lg:flex">
          
         
          <div className="lg:w-1/2 p-6 lg:p-10 bg-gray-100 flex flex-col items-center justify-center">
          
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] mb-6 rounded-2xl overflow-hidden shadow-lg bg-white">
              <img
                src={activeImage}
                alt={food.name}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto w-full py-2 px-1 scrollbar-hide">
              {food.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === img 
                      ? "border-orange-500 ring-2 ring-orange-200 scale-105" 
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

         
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            
          
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {food.category}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {food.cuisine}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {food.name}
            </h1>

         
            <div className="prose prose-lg text-gray-600 mb-8 flex-grow">
              <p className="leading-relaxed">
                {food.description}
              </p>
            </div>

          
            <div className="border-t border-gray-200 my-6"></div>

            
              <div className="mt-6 p-6 bg-gray-900 text-white rounded-3xl shadow-lg">
          <p className="text-xl mb-4 font-semibold">
            Quick Highlights
          </p>
          <ul className="space-y-2 text-gray-200">
            <li>• Authentic flavor experience</li>
            <li>• Signature texture & aroma</li>
            <li>• Perfect for family meals</li>
            <li>• Easy to prepare at home</li>
          </ul>
        </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}
