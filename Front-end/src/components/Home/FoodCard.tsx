import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFoods } from '../../services/FoodAPI'

interface Food{
  _id: string
  name: string
  category: string
  cuisine: string
  description: string
  images: string[]
}

interface Props{
  selectedCategory?: string
}


export default function FoodCard({selectedCategory}:Props) {

  const [foods, setFoods] = useState<Food[]>([])
  const navigate = useNavigate()

  useEffect(() =>{
    const fetchFoods = async () =>{
      try{
        const response = await getAllFoods(1,8)
        console.log("API response:", response)
        console.log(response.data)

        if (response && response.data && response.data.data) {
          let allFoods = response.data.data.foods;

          if (selectedCategory) {
            allFoods = allFoods.filter(
              (f: Food) =>
                f.category.toLowerCase() === selectedCategory.toLowerCase()
            );
          }
          
          setFoods(allFoods.slice(0, 8));
        }

      }catch(error){
        console.error(error)
      }
    }
    fetchFoods()
  },[selectedCategory])
  return (
    <section className='px-8 md:px-20 py-10 '>
        

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

          {foods.map((food) =>(
            <div 
              key={food._id}
              onClick={()=> navigate(`/foodpage/${food.name}`)}
              className='group cursor-pointer bg-[#2d1b0b]/40 backdrop-blur-md 
                       border border-white/10
                       rounded-2xl overflow-hidden 
                       hover:border-[#f59e0b]/50
                       transition-all duration-300 ease-in-out
                       hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] 
                       hover:-translate-y-2'>

              <div className='overflow-hidden h-48'>
                <img
                  src={food.images?.[0]}
                  alt={food.name}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>

              <div className='p-5'>
                <h3 className='text-lg font-bold text-[#f3e8dd] group-hover:text-[#f59e0b] transition-colors duration-300 line-clamp-1'>
                  {food.name}
                </h3>
                <p className='text-xs text-[#ab886d] mt-1 uppercase tracking-widest font-medium'>
                  {food.category}
                </p>
              </div>
            </div>
          ))}

        </div>
    </section>
  )
}
