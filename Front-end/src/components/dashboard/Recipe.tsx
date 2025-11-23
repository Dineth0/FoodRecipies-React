import { useEffect, useState } from "react"
import { getAllRecipes } from "../../services/RecipeAPI"
import { showErrorAlert } from "../../utils/SweetAlerts"
import { IoMdAdd } from "react-icons/io"
import { FaEdit, FaTrash } from "react-icons/fa"
import { RecipeForm } from "./RecipeForm"


interface User {
  _id: string;
  name: string;
}

interface Food {
  _id: string;
  name: string;
}

interface RecipeItem{
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

export default function Recipes(){
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [recipes, setRecipes] = useState<RecipeItem[]>([])
    const [showForm, setShoeForm] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null)

    useEffect(()=>{
        const fetchRecipe = async () =>{
            try{
                const response = await getAllRecipes(page, 3)
                setRecipes(response.data.data.recipes)
                setTotalPages(response.data.totalPages)
            }catch(error){
                console.error(error)
                showErrorAlert('error', "Can not load data")
            }
        }
        fetchRecipe()
    },[page])

    const handleSavedFood = () =>{
        
    }

    const handleEditRecipe = (recipe: RecipeItem) =>{
        setSelectedRecipe(recipe)
        setShoeForm(true)
    }

    const handleAddClick = () =>{
        setSelectedRecipe(null)
        setShoeForm(true)
    }
    const handleCloseForm = () =>{
        setSelectedRecipe(null)
        setShoeForm(false)
    }




    return(
        <>
        <div className="text-center text-gray-300 py-10">
            <div className="flex justify-end mb-4">
                <button className="flex items-center gap-1 text-green-400 hover:text-green-600 font-medium"
                onClick={handleAddClick}>
                    Add Recipe<IoMdAdd className="text-lg"/>
                </button>
            </div>
            <div className="w-full overflow-auto">
            <table className="w-full text-left text-sm">
                <thead className="text-gray-300 border-b border-gray-700">
                    <tr>
                        <th className="py-2 px-4">Recipe Title</th>
                        <th className="py-2 px-4">Food</th> 
                        <th className="py-2 px-4">User</th> 
                        <th className="py-2 px-4">Ingredients</th> 
                        <th className="py-2 px-4">Step</th> 
                        <th className="py-2 px-4">ReadyIn</th> 
                        <th className="py-2 px-4">Date</th> 
                        <th className="py-2 px-4">Images</th>
                        <th className="py-2 px-4">Action</th>   
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index)=>(
                        <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                            <td className="py-2 px-4">{recipe.title}</td>
                            <td className="py-2 px-4">{recipe.food?.name}</td>
                            <td className="py-2 px-4">{recipe.user?.name}</td>
                            <td className="py-2 px-4">
                                {(()=>{
                                    const ingre = recipe.ingredients
                                    if(Array.isArray(ingre)){
                                        return ingre.join(", ")
                                    }
                                    try{
                                        return JSON.parse(ingre).join(", ")
                                    }catch{
                                        return ingre
                                    }
                                })()}
                            </td>
                            <td className="py-2 px-4">{recipe.step}</td>
                            <td className="py-2 px-4">{recipe.readyIn}</td>
                            <td className="py-2 px-4">
                                {new Date(recipe.date).toLocaleDateString()}
                            </td>
                            
                            <td className="py-2 px-4 flex gap-2 justify-center">
                                {recipe.images && recipe.images.length > 0 ? (
                                    recipe.images.map((imageUrl, idx)=>(
                                        <img
                                            key={idx}
                                            src={imageUrl}
                                            alt={`${recipe.title} ${idx + 1}`}
                                            className="w-16 h-16 object-cover rounded-md">
                                            
                                        </img>
                                    ))
                                ):(
                                    <span>No Images</span>
                                )}
                            </td>

                            <td className="py-2 px-4">
                                <button className="text-blue-400 hover:text-blue-600 mx-2"
                                    onClick={()=> handleEditRecipe(recipe)}>
                                    <FaEdit/>
                                </button>
                                <button className="text-blue-400 hover:text-blue-600 mx-2">
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        {
            showForm && (
                <RecipeForm
                    onClose={handleCloseForm}
                    onSave={handleSavedFood}
                    selectedRecipe={selectedRecipe}
                />
            )
        }
        </>
    )
}