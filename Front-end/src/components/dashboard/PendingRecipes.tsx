import { useEffect, useState } from "react";
import { getPendingRecipes } from "../../services/RecipeAPI";

interface Recipe{
    _id: string;
    title: string;
    user: { name: string };
    food: { name: string };
    ingredients: string
    step: string
    readyIn:string
    status: string;
    date: string;
    images: string[]
}

export default function PendingRecipes(){

    const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([])

    useEffect(()=>{
        const loadPendingRecipes =  async ()=>{
            try{
                const response = await getPendingRecipes()
                setPendingRecipes(response.data.data.recipes)
            }catch(error){
                console.error(error)
            }

        }
        loadPendingRecipes()
    },[])



    return(
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Pending Recipes</h2>
            {pendingRecipes.length === 0 ? (
                <p className="text-gray-300">No Pending Recipes</p>
            ):(
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm  text-gray-300">
                        <thead className="uppercase tracking-wider border-b border-gray-700 bg-gray-800">
                            <tr>
                                <th scope="col" className="py-2 px-4">Title</th>
                                <th scope="col" className="py-2 px-4">Food</th>
                                <th scope="col" className="py-2 px-4">User</th>
                                <th scope="col" className="py-2 px-4">Ingradiants</th>
                                <th scope="col" className="py-2 px-4">Ready In</th>
                                <th scope="col" className="py-2 px-4">Date</th>
                                <th scope="col" className="py-2 px-4">Step</th>
                                <th scope="col" className="py-2 px-4">Images</th>
                                <th scope="col" className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRecipes.map((recipe)=>(
                                <tr key={recipe._id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-4 py-2 font-medium text-white">{recipe.title}</td>
                                    <td className="px-4 py-2">{recipe.food.name}</td>
                                    <td className="px-4 py-2">{recipe.user.name}</td>
                                    <td className="py-4 px-2">
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
                                    <td className="px-4 py-2">{recipe.readyIn}</td>
                                    <td className="px-4 py-2">
                                        {new Date(recipe.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">{recipe.step}</td>
                                    <td className="py-4 px-2 flex gap-2 justify-center">
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
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                                            Approve ✅
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}