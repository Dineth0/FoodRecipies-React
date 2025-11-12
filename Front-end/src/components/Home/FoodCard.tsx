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


export default function FoodCard() {

  const [foods, setFoods] = useState<Food[]>([])
  const navigate = useNavigate()

  useEffect(() =>{
    const fetchFoods = async () =>{
      try{
        const response = await getAllFoods()
        console.log(response.data)
        setFoods(response.data.data.foods)

      }catch(error){
        console.error(error)
      }
    }
    fetchFoods()
  },[])
  return (
    <section className='px-8 md:px-20 py-12  bg-green-100'>
        <h2 className='text-3xl font-bold text-[#2d1b0b] mb-8'>Foods</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>

          {foods.map((food) =>(
            <div 
              key={food._id}
              onClick={()=> navigate(`/food/${food._id}`)}
              className='cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2'>

              <img
                  src={food.images?.[0]}
                  alt={food.name}
                  className='h-48 w-full object-cover'>
              </img>

              <div className='p-4'>
                <h3 className='text-lg font-semibold text-[#2d1b0b]'>{food.name}</h3>
              </div>
            </div>
          ))}

        </div>
    </section>
  )
}
