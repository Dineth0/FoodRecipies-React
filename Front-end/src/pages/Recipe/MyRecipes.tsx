import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteRecipes, getRecipeByUser } from "../../services/RecipeAPI";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  step: string;
  readyIn: string;
  images?: string[];
}

export default function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipes(id);
        setRecipes(prev => prev.filter(r => r._id !== id));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">My Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            {recipe.images && recipe.images.length > 0 ? (
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Ingredients: {recipe.ingredients.join(", ")}
              </p>
              <p className="text-gray-700 text-sm mb-2">
               STEPS: {recipe.step.length > 100 ? recipe.step.slice(0, 100) + "..." : recipe.step}
              </p>

              <p className="text-sm text-gray-600 mb-2">Ready In: {recipe.readyIn}</p>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
