import { useEffect, useState } from "react"
import { deleteRecipes, getAllRecipes } from "../../services/RecipeAPI"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
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

    const handleSavedFood = (savedRecipe: RecipeItem) =>{
        if (selectedRecipe) {
        setRecipes((prevRecipes) => 
            prevRecipes.map((recipe) => 
                recipe._id === savedRecipe._id ? savedRecipe : recipe
            )
        );
    } else {
        setRecipes((prevRecipes) => [savedRecipe, ...prevRecipes]);
    }

    handleCloseForm();
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

    const handleDelete = (recipeDelete : RecipeItem)=>{
        showConfirmDialog(
           'Are you sure?',
            `${recipeDelete.title} Do you want to delete? `,
            'Yes, Delete id!' 
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteRecipes(recipeDelete._id)
                    setRecipes(prevRecipes =>
                        prevRecipes.filter(recipe => recipe._id !== recipeDelete._id)
                    )
                    showSuccessAlert('Deleted' ,`${recipeDelete.title} has been Deleted`)
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Faild to delete')
                }
            }
            
            
        })
    }



    return(
        <>
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Recipes</h2>
            <div className="flex justify-end mb-4">
                <button className="flex items-center gap-1 text-green-400 hover:text-green-600 font-medium"
                onClick={handleAddClick}>
                    Add Recipe<IoMdAdd className="text-lg"/>
                </button>
            </div>
            <div className="w-full overflow-auto">
            <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
                <thead className="uppercase tracking-wider  bg-black/70 backdrop-blur-md border-b border-white/20">
                    <tr>
                        <th scope="col" className="py-2 px-4 w-[10%]">Title</th>
                        <th scope="col" className="py-2 px-4 w-[8%]">Food</th>
                        <th scope="col" className="py-2 px-4 w-[8%]">User</th>
                        <th scope="col" className="py-2 px-4 w-[12%]">Ingradiants</th>
                        <th scope="col" className="py-2 px-4 w-[25%]">Step</th>
                        <th scope="col" className="py-2 px-4 w-[8%]">Ready In</th>
                        <th scope="col" className="py-2 px-4 w-[8%]">Date</th>
                        <th scope="col" className="py-2 px-4 w-[25%] text-center">Images</th>
                        <th scope="col" className="py-2 px-4 w-[10%] text-center">Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index)=>(
                        <tr key={index} className="border-b border-gray-800 hover:bg-black/25">
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
                            <td className="px-4 py-2 align-top">
                                        <div className="break-words whitespace-pre-wrap max-h-40 overflow-y-auto pr-1">
                                            {recipe.step}
                                        </div>
                                    </td>
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
                                <button className="text-red-400 hover:text-blue-600 mx-2"
                                    onClick={()=> handleDelete(recipe)}>
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