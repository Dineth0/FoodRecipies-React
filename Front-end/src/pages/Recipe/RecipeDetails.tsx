import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadRecipePDF, getRecipeByName } from "../../services/RecipeAPI";
import { MdOutlinePostAdd } from "react-icons/md";
import { ReviewForm } from "../../components/Review/ReviewForm";
import { getReviewByRecipe } from "../../services/ReviewAPI";
import ReviewCard from "../../components/Review/ReviewCard";
import { FaFilePdf } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";


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
  videos?: string[]
}
interface ReviewItem {
  _id: string;
  user: User;
  recipe: {
    _id: string;
    title: string;
  };
  rating: number;
  description: string;
}

export default function RecipeDetailsPage() {
  const { title } = useParams<{ title: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeMedia, setActiveMedia] = useState<string>("");
  const [showForm, setShowForm] = useState(false)
  const [review, setReview] = useState<ReviewItem[]>([])
  const currentUser = useSelector((state: RootState) => state.auth.user);
 

  useEffect(() => {
    if (!title) return;

    const fetchRecipe = async () => {
      try {
        const response = await getRecipeByName(title);
        const recipeDetails = response.data.data.recipe;

        setRecipe(recipeDetails);

        const reviewResponse = await getReviewByRecipe(recipeDetails._id)
        setReview(reviewResponse.data.data.review)


        if (recipeDetails.images && recipeDetails.images.length > 0) {
        setActiveMedia(recipeDetails.images[0]);
        } else if (recipeDetails.videos && recipeDetails.videos.length > 0) {
          setActiveMedia(recipeDetails.videos[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
  }, [title]);

  const handleDownloadPDF = async () => {
    if (!recipe) return;

    try {
      const response = await downloadRecipePDF(recipe._id);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
  
      link.setAttribute('download', `${recipe.title.replace(/\s+/g, '_')}.pdf`);
      
      document.body.appendChild(link);
      link.click();
      
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF");
    }
  };

  const handleAddClick = () =>{
    setShowForm(true)
  }
  const handleCloseform = () =>{
    setShowForm(false)
  }
  const handleSave  = (newReview: ReviewItem) =>{
    const reviewWithUser = {
      ...newReview,
      user: typeof newReview.user === 'string' 
            ? { _id: newReview.user, name: currentUser?.name || "Me" } 
            : newReview.user
    };

    setReview((prevReviews) => {
      const existingIndex = prevReviews.findIndex((r) => r._id === reviewWithUser._id);

      if (existingIndex >= 0) {
        const updatedReviews = [...prevReviews];
        updatedReviews[existingIndex] = reviewWithUser as ReviewItem;
        return updatedReviews;
      } else {
        return [...prevReviews, reviewWithUser as ReviewItem];
      }
    });
        setShowForm(false);
  } 
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || recipe?.videos?.includes(url);
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-10  bg-gradient-to-br from-[#A27B5C] via-[#AB886D] to-[#23120b]   ">
        <div className="max-w-6xl mx-auto mt-10">
            

            <div className="flex justify-between items-center mt-3">
                <h1 className="text-4xl sm:text-5xl font-bold text-[#3a2f2a]">
                    {recipe?.title}
                </h1>
                
               
                <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-lg transition-all"
                >
                    <FaFilePdf /> Download PDF
                </button>
            </div>


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
                <div className="w-full h-[350px] rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden mb-4 bg-black">
                  {isVideo(activeMedia) ? (
                    <video 
                      src={activeMedia} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeMedia}
                      className="object-cover w-full h-full"
                      alt="Recipe"
                    />
                  )}
                </div>

              
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            
                  {recipe?.images?.map((img, i) => (
                    <button
                      key={`img-${i}`}
                      onClick={() => setActiveMedia(img)}
                      className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        activeMedia === img ? "border-[#ff8a00] scale-95" : "border-transparent opacity-70"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${i}`} />
                    </button>
                  ))}

                 
                  {recipe?.videos?.map((vid, i) => (
                    <button
                      key={`vid-${i}`}
                      onClick={() => setActiveMedia(vid)}
                      className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        activeMedia === vid ? "border-[#ff8a00] scale-95" : "border-transparent opacity-70"
                      }`}
                    >
                      <video src={vid} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
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
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-bold mb-8 border-l-4  border-[#ff8a00] pl-4 text-[#3a2f2a] ">
                    Reviews
                </span>
               
                    <button 
                        onClick={handleAddClick}    
                        className="bg-[#7B4019] w-55 h-10 hover:bg-[#954C2E] text-white px-6 py-3 rounded-full text-lg flex items-center gap-2 shadow-md mb-6"
                    >
                      <MdOutlinePostAdd size={24}/>
                          Add Your Review
                    </button>
                </div>
                
               

                {review.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 text-lg">No Review available for this Recipe yet.</p>
                  </div>
                ):(
                  <div className="mb-4 space-y-4">
                    {review.map((rev)=>(
                      <ReviewCard key={rev._id} review={rev} />
                    ))}
                  </div>
                )}
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
