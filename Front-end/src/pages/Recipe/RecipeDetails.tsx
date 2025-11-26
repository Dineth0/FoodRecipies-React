import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeByName } from "../../services/RecipeAPI";

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

export default function RecipeDeatilsPage() {
    const {title} = useParams<{title : string}>()
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    useEffect(()=>{
        if(!title) return

        const fetchRecipe = async()=>{
            try{
                const response = await getRecipeByName(title)
                console.log(response.data)
                const recipeDetails = response.data.data.recipe
                setRecipe(recipeDetails)
            }catch(error){
                console.log(error)
            }
        }
        fetchRecipe()
    },[name])

    return(
    <>
        <div className="mt-12">{recipe?.title}</div>
        <div>{recipe?.ingredients}</div>
        <div>{recipe?.readyIn}</div>
        <div>{recipe?.step}</div>
    </>
        
    )
}