import { useEffect, useState } from "react"
import { deleteReview, getReviewByUser } from "../../services/ReviewAPI"
import { FaStar ,FaEdit,FaTrash } from "react-icons/fa";
import { ReviewForm } from "../../components/Review/ReviewForm";
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";


interface User{
    _id:string
    name: string
}

interface Recipe{
    _id: string
    title: string
}

interface ReviewCardItem{
    _id : string
    user:User
    recipe:Recipe
    rating: number
    description: string
}
export default function MyReview() {
    const [review, setReview] = useState<ReviewCardItem[]>([])
    const [selectedReview, setSelectedReview] = useState<ReviewCardItem | null>(null)
    const [showForm,setShowForm] = useState(false)

    useEffect(()=>{
        const fetchReviews = async () =>{
            try{
                const reponse = await getReviewByUser()
                setReview(reponse.data.data.reviews)
            }catch(error){
                console.error(error)
            }
        }
        fetchReviews()
    },[])
    const renderStar = (rating: number) =>{
        return [...Array(5)].map((_, index)=>{
            return(
                <FaStar
                    key={index}
                    size={16}
                    className={index < rating ? "text-yellow-500" : "text-gray-300"}/>
            )
        })
    }
    const handleEdit = (review: ReviewCardItem) =>{
        setSelectedReview(review)
        setShowForm(true)
    }
    const handleCloseForm = () =>{
        setSelectedReview(null)
        setShowForm(false)
    }
    const handleSaved = () =>{
        
    }

    const handleDelete = (reviewDelete : ReviewCardItem) =>{
        showConfirmDialog(
            'Are you sure?',
            ` Do you want to delete? `,
            'Yes, Delete id!'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteReview(reviewDelete._id)
                    setReview(prevReviews =>
                        prevReviews.filter(rev => rev._id !== reviewDelete._id)
                    )

                    showSuccessAlert('Deleted' ,'This has been Deleted')
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Faild to delete')
                }
            }
        })
    }
  return (
        <div className="min-h-screen py-20 px-4 sm:px-10 lg:px-20 bg-gradient-to-br from-[#A27B5C]  to-[#23120b] to-[#23120b]">
            
        
            <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-5">
                <h1 className="text-3xl font-extrabold text-[#f3e8dd] tracking-tight">
                    My <span className="text-[#f59e0b]">Reviews</span>
                </h1>
                <p className="text-[#ab886d] text-sm hidden sm:block">You have shared {review.length} experiences</p>
            </div>

            {review.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-24 bg-[#2d1b0b]/20 rounded-3xl border border-dashed border-white/10">
                    <p className="text-xl font-semibold mb-2 text-[#f3e8dd]">No reviews yet</p>
                    <p className="text-[#ab886d]">You haven’t reviewed any recipes yet. Start sharing your taste! 🍲</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {review.map((rev) => (
                        <div 
                            key={rev._id}
                            className="bg-[#2d1b0b]/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-[#f59e0b]/30 transition-all duration-300 shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#b45309] to-[#f59e0b] flex items-center justify-center text-[#2d1b0b] text-xl font-black uppercase shadow-lg border-2 border-white/10">
                                        {rev.user.name.charAt(0)}
                                    </div>
                                </div>

                            
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold text-[#f3e8dd] tracking-wide uppercase">
                                                {rev.user.name}
                                            </h4>
                                            <p className="text-xs text-[#f59e0b] font-medium mt-1">
                                                Recipe: <span className="text-[#f3e8dd] italic">{rev.recipe.title}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            {renderStar(rev.rating)}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <p className="text-[#ab886d] leading-relaxed text-[15px] italic bg-[#1a0d08]/40 p-4 rounded-xl border border-white/5">
                                            "{rev.description}"
                                        </p>
                                    </div>
                                </div>

                              
                                <div className="flex md:flex-col gap-3 ml-auto">
                                    <button 
                                        className='p-3 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-md'
                                        onClick={() => handleEdit(rev)}
                                        title="Edit Review"
                                    >
                                        <FaEdit size={16}/>
                                    </button>
                                    <button 
                                        className='p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-md'
                                        onClick={() => handleDelete(rev)}
                                        title="Delete Review"
                                    >
                                        <FaTrash size={16}/>
                                    </button> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <ReviewForm
                    onClose={handleCloseForm}
                    onSave={handleSaved}
                    selectedReview={selectedReview}
                    recipeId={selectedReview!.recipe._id}
                />
            )}
        </div>
    )
}
