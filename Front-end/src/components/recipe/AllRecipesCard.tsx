import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllRecipes } from "../../services/RecipeAPI"

interface Recipe {
  _id : string
  title : string
  readyIn : string
  step : string
  images?: string[]
}

export default function AllRecipesCard(){
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchRecipes = async ()=>{
            try{
                const response = await getAllRecipes(page, 8)
                setRecipes(response.data.data.recipes)
                setTotalPages(response.data.totalPages)
            }catch(error){
                console.error(error)
            }
        
        }
        fetchRecipes()
    },[page])


    return(
        <>
        <div className="px-8 md:px-20 py-10 mt-12">
            <h1 className="text-3xl font-extrabold text-[#f3e8dd] tracking-tight mb-4">
                All <span className="text-[#f59e0b]">Recipes</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {recipes.map((recipe) =>(
                    <div
                        key={recipe._id}
                        onClick={()=>navigate(`/recipe/${recipe.title}`)}
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
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
                    page === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                >
                Prev
                </button>

                <span className="text-gray-600 text-sm">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
                </span>

                <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
                    page === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                >
                Next
                </button>
            </div>
        </div>
        </>
     )
}