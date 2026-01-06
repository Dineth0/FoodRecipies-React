import { useNavigate } from "react-router-dom"


interface Recipe {
  _id : string
  title : string
  readyIn : string
  step : string
  images?: string[]
}

interface RecipeCardProps {
  recipe : Recipe
}

export default function RecipeCard({recipe}:RecipeCardProps){
  const navigate = useNavigate()
  return(
    <div 
      key={recipe._id}
      onClick={()=> navigate(`/recipe/${recipe.title}`)}
      className='group cursor-pointer bg-[#2d1b0b]/40 backdrop-blur-md 
                       border border-white/10
                       rounded-2xl overflow-hidden 
                       hover:border-[#f59e0b]/50
                       transition-all duration-300 ease-in-out
                       hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] 
                       hover:-translate-y-2'>
      <div className='h-48 w-full overflow-hidden'>
            {recipe.images && recipe.images.length > 0 ?(
              <div className='overflow-hidden h-48'>
                <img
                  src={recipe.images?.[0]}
                  alt={recipe.title}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
            ) : (
              <div className='h-full w-full bg-gray-200 flex items-center justify-center text-gray-500'>
                    No Image
              </div>
            )}
        </div>

          <div className='p-5'>
              <h3 className='text-lg font-bold text-[#f3e8dd] group-hover:text-[#f59e0b] transition-colors duration-300 line-clamp-1'>
                {recipe.title}
              </h3>
               
          </div>
    </div>
  )

}