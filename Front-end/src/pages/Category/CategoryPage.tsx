import { useParams } from 'react-router-dom'
import FoodCard from '../../components/Home/FoodCard'

export default function CategoryPage() {
  const {category} = useParams<{category: string}>()
  const formattedTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : "";
  return (
    <div className='mt-2 min-h-screen bg-fixed  bg-cover bg-center bg-gradient-to-br from-[#A27B5C]  to-[#23120b]  py-10 '>
       <h2 className='mt-7 ml-18 mb-5 text-3xl font-bold text-[#2d1b0b] mb-8'>{formattedTitle}</h2> 
      <FoodCard selectedCategory={category} />
    </div>
  )
}

