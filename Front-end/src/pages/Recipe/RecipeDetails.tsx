import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  _id: string;
  user: User;
  food: Food;
  title: string;
  ingredients: string[];
  step: string;
  readyIn: string;
  date: Date;
  images?: string[];
}

export default function RecipeDetailsPage() {
  const { title } = useParams<{ title: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeImage, setActiveImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!title) return;

    const fetchRecipe = async () => {
      try {
        const response = await getRecipeByName(title);
        const recipeDetails = response.data.data.recipe;

        setRecipe(recipeDetails);

        if (recipeDetails.images?.length > 0) {
          setActiveImage(recipeDetails.images[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, [title]);

  return (
    <div className="min-h-screen bg-[#faf9f7] py-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 text-gray-700 hover:text-black font-semibold">
                Back
            </button>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                {recipe?.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-10 text-gray-600">
                <span className="px-4 py-1 bg-gray-200 rounded-full text-sm">
                    Food: <span className="font-semibold">{recipe?.food.name}</span>
                </span>

                <span className="px-4 py-1 bg-gray-200 rounded-full text-sm">
                    Posted By: <span className="font-semibold">{recipe?.user.name}</span>
                </span>

                <span className="px-4 py-1 bg-gray-200 rounded-full text-sm">
                    Ready In: <span className="font-semibold">{recipe?.readyIn}</span>
                </span>

                <span className="px-4 py-1 bg-gray-200 rounded-full text-sm">
                  Date:{""}
                  <span>
                    {recipe?.date ? new Date(recipe.date).toLocaleDateString():""}
                  </span>
                </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="w-full h-[350px] rounded-3xl shadow-xl overflow-hidden mb-4">
                  <img
                    src={activeImage}
                    className="object-cover w-full h-full">
                      
                  </img>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {recipe?.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 ${
                      activeImage === img
                        ? "border-black"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                  ))}
                </div>

              </div>

              <div className="space-y-8">

             
                <div>
                  <h2 className="text-2xl font-semibold mb-3">About this recipe</h2>
                  <p className="text-gray-700 leading-relaxed">
                    A beautifully crafted dish with a rich blend of flavors and 
                    textures. Follow through the steps to recreate this delicious meal.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                  <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {recipe?.ingredients.map((ing, i) => (
                      <li key={i}>{ing.trim()}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            <div className="mt-16 bg-white p-10 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-orange-500 pl-4">
                    Step By Step Instructions
                </h2>

                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {recipe?.step}
                </p>
            </div>
        </div>
    </div>
  );
}
