import { useEffect, useState } from "react"
import {  getFoodByName } from "../../services/FoodAPI"
import {  useParams } from "react-router-dom"
import { getRecipeByFood } from "../../services/RecipeAPI"
import RecipeCard from "../../components/recipe/RecipeCard"
import { MdOutlinePostAdd } from "react-icons/md";
import { UserAddRecipeForm } from "../../components/UserAddRecipeForm"
import { showSuccessAlert } from "../../utils/SweetAlerts"

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
    const [recipes, setRecipes] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false)

    useEffect(() =>{
      if(!name) return
        const fetchFood = async()=>{
            try{
                const response = await getFoodByName(name)
                console.log(response.data)
                const foodDetail = response.data.data.food
                setFood(foodDetail)
                const recipeResponse = await getRecipeByFood(foodDetail._id);
                setRecipes(recipeResponse.data.data.recipes);

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
     const handleSavedFood = (newRecipe: any) =>{
        setShowForm(false); // Form එක close කරනවා

        // Recipe එකේ status එක Approved නම් විතරක් (Admin දැම්මොත්) ලිස්ට් එකට දානවා
        if (newRecipe.status === 'Approved') {
            setRecipes((prev) => [newRecipe, ...prev]);
            showSuccessAlert('Success', 'Recipe Added Successfully!');
        } else {
            // User කෙනෙක් නම් (Pending නම්) ලිස්ට් එකට දාන්නේ නෑ. Message එක විතරයි.
            showSuccessAlert('Submitted', 'Your recipe has been submitted for admin approval.');
        }
      }
    const handleAddClick = () =>{
        
        setShowForm(true)
    }
     const handleCloseForm = () =>{
        setShowForm(false)
    }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fde7c5] via-[#f9d29d] to-[#f6c07a] mt-12 ">
      <div className="max-w-7xl mx-auto">

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
        <div className="mt-10 flex justify-center">
          <button 
            onClick={handleAddClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg flex items-center gap-2 shadow-md"
          >
            <MdOutlinePostAdd size={24}/>
            Add Your Recipe
          </button>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-l-4 border-orange-500 pl-4">
            Related Recipes
          </h2>

          {recipes.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
               <p className="text-gray-500 text-lg">No recipes available for this food yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

      </div>
      {
        showForm && (
          <UserAddRecipeForm
              onClose={handleCloseForm}
              onSave={handleSavedFood}
              />
        )
      }
    </div>
    
  );
  
}
