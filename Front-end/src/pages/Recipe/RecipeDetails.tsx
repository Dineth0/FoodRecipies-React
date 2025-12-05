import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeByName } from "../../services/RecipeAPI";
import { MdOutlinePostAdd } from "react-icons/md";
import { ReviewForm } from "../../components/Review/ReviewForm";


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
  const [showForm, setShowForm] = useState(false)
 

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

  const handleAddClick = () =>{
    setShowForm(true)
  }
  const handleCloseform = () =>{
    setShowForm(false)
  }
  const handleSave  =() =>{

  } 

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-[#fff3e4] via-[#ffd8b5] to-[#ffba7a]">
        <div className="max-w-6xl mx-auto">
            

            <h1 className="text-4xl sm:text-5xl font-bold text-[#3a2f2a] tracking-tight mt-3">
                {recipe?.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-10 text-[#7a6e67] mt-6">
                <span className="px-4 py-1 bg-[#fff5eb] border border-[#ffe1c4] rounded-full text-sm">
                    Food: <span className="font-semibold text-[#3a2f2a]">{recipe?.food.name}</span>
                </span>

                <span className="px-4 py-1 bg-[#fff5eb] border border-[#ffe1c4] rounded-full text-sm">
                    Posted By: <span className="font-semibold text-[#3a2f2a]">{recipe?.user.name}</span>
                </span>

                <span className="px-4 py-1 bg-[#fff5eb] border border-[#ffe1c4] rounded-full text-sm">
                    Ready In: <span className="font-semibold text-[#3a2f2a]">{recipe?.readyIn}</span>
                </span>

                <span className="px-4 py-1 bg-[#fff5eb] border border-[#ffe1c4] rounded-full text-sm">
                  Date:<span className="font-semibold text-[#3a2f2a]"></span>
                  <span>
                    {recipe?.date ? new Date(recipe.date).toLocaleDateString():""}
                  </span>
                </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <div className="w-full h-[350px] rounded-3xl  shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden mb-4">
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
                  <h2 className="text-2xl font-semibold mb-3 text-[#3a2f2a]">About this recipe</h2>
                  <p className=" text-[#5c4f47] text-gray-700 leading-relaxed">
                    A beautifully crafted dish with a rich blend of flavors and 
                    textures. Follow through the steps to recreate this delicious meal.
                  </p>
                </div>

                <div className=" bg-[#ffe8d6] p-6 rounded-3xl shadow-md border border-gray-100 ">
                  <h2 className="text-2xl font-semibold text-[#3a2f2a] mb-4">Ingredients</h2>
                  <ul className="list-disc pl-5 space-y-1 text-[#5c4f47]">
                    {recipe?.ingredients.map((ing, i) => (
                      <li key={i}>{ing.trim()}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            <div className="mt-16 bg-[#ffe8d6] p-10 rounded-3xl  shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
                <h2 className="text-3xl font-bold mb-6 border-l-4  border-[#ff8a00] pl-4 text-[#3a2f2a] pl-4">
                    Step By Step Instructions
                </h2>

                <p className="text-[#5c4f47] text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {recipe?.step}
                </p>
            </div>

            <div className="mt-16 bg-[#ffe8d6] p-10 rounded-3xl  shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
                <h2 className="text-3xl font-bold mb-6 border-l-4  border-[#ff8a00] pl-4 text-[#3a2f2a] pl-4">
                    Reviews
                </h2>
                <span className=" ">
                    <button 
                        onClick={handleAddClick}    
                    className="bg-orange-500 w-55 h-10 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg flex items-center gap-2 shadow-md"
                    >
                      <MdOutlinePostAdd size={24}/>
                          Add Your Review
                    </button>
                </span>

                {/* <p className="text-[#5c4f47] text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {recipe?.step}
                </p> */}
            </div>
        </div>
        {
          showForm && (
            <ReviewForm
              onClose={handleCloseform}
              onSave={handleSave}
              recipeId={recipe!._id}/>
          )
        }
    </div>
  );
}
