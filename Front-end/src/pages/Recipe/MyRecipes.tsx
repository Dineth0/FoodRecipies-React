import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteRecipes, getRecipeByUser } from "../../services/RecipeAPI";
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";
import { RecipeForm } from "../../components/dashboard/RecipeForm";
import { useDispatch } from "react-redux";
import type { AppDisPatch } from "../../redux/store";
import { setSelectedMyRecipe } from "../../redux/slices/recipeSlice";

interface User {
  _id: string;
  name: string;
}

interface Food {
  _id: string;
  name: string;
}
interface Recipe {
 _id: string
    user: User
    food: Food
    title:string
    ingredients: string
    step: string
    readyIn : string
    date: Date
    images?: string[]
}

export default function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch<AppDisPatch>();
  

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await getRecipeByUser();
      setRecipes(res.data.data.recipes);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (recipe: Recipe)=>{
    dispatch(setSelectedMyRecipe(recipe))
    setShowForm(true)
  }

  const handleCloseForm = () =>{
        dispatch(setSelectedMyRecipe(null))
        setShowForm(false)
  }

  const handleMyRecipesaved = () =>{
   
    handleCloseForm()
  }

  const handleDelete = async (recipeDelete: Recipe) => {
    showConfirmDialog(
            'Are you sure?',
            `${recipeDelete.title} Do you want to delete? `,
            'Yes, Delete id!'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteRecipes(recipeDelete._id)
                    setRecipes(prevRecipes =>
                        prevRecipes.filter(rec => rec._id !== recipeDelete._id)
                    )

                    showSuccessAlert('Deleted' ,`${recipeDelete.title} has been Deleted`)
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Faild to delete')
                }
            }
        })
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen py-12 px-6 md:px-12 bg-gradient-to-br from-[#A27B5C]  to-[#23120b] to-[#23120b]">
      

      <div className="flex justify-between items-center mb-10 mt-6 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-extrabold text-[#f3e8dd] tracking-tight">
          My <span className="text-[#f59e0b]">Reviews</span>
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-[#f59e0b] text-[#2d1b0b] font-bold rounded-full hover:bg-[#d97706] transition-all transform hover:scale-105 shadow-lg"
        >
          + Add New
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
          <p className="text-xl font-semibold mb-2 text-[#f3e8dd]">No recipes yet</p>
          <p className="mb-6 text-[#ab886d]">You haven’t added any recipes yet. Start cooking!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-gradient-to-r from-[#b45309] to-[#d97706] text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition"
          >
            Add your first recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group bg-[#2d1b0b]/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:-translate-y-2"
            >
            
              <div className="h-52 overflow-hidden relative">
                {recipe.images && recipe.images.length > 0 ? (
                  <img
                    src={recipe.images[0]}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a0d08] flex items-center justify-center text-[#ab886d]">
                    No Image
                  </div>
                )}
                
              </div>

            
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#f3e8dd] mb-2 group-hover:text-[#f59e0b] transition-colors line-clamp-1">
                  {recipe.title}
                </h2>
                
                

               
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  
                  <div className="flex gap-2">
                    <button
                      className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300"
                      onClick={() => handleEdit(recipe)}
                      title="Edit Recipe"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(recipe)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                      title="Delete Recipe"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <RecipeForm
          onClose={handleCloseForm}
          onSave={handleMyRecipesaved}
        />
      )}
    </div>
  );
}