import { useEffect, useState } from "react"
import { getReviewByUser } from "../../services/ReviewAPI"
import { FaStar ,FaEdit,FaTrash } from "react-icons/fa";
import { ReviewForm } from "../../components/Review/ReviewForm";


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
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fde7c5] via-[#f9d29d] to-[#f6c07a] mt-12 ">
        {review.length === 0 ? (
            <p>No Your Reviews Yet</p>
        ):(
            review.map((rev)=>(

            
                <div className="border-b border-gray-100 py-6 bg-white rounded-full ">
                    <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold uppercase shadow-sm ml-25">
                                {rev.user.name.charAt(0)}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-1 ml-1">
                                {rev.user.name}
                            </h4>
                        
                            <div className="flex gap-1 mb-3 ml-1">
                                {renderStar(rev.rating)}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-[15px] mr-4">
                                {rev.description}

                            </p>
                        </div>
                        <div className="flex flex-center gap-4 ml-4 pr-6">
                            <button className='p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-700 shadow-sm transition '
                                 onClick={() =>handleEdit(rev)}>
                                    <FaEdit size={18}/>
                        </button>
                        <button className='p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 shadow-sm transition'
                                onClick={()=>handleDelete(rev)}>
                                    <FaTrash size={18}/>
                        </button> 
                        </div>
                           
                    </div>
                </div>
            ))
        )}
        {showForm &&(
                <ReviewForm
                onClose={handleCloseForm}
                onSave={handleSaved}
                
                selectedReview = {selectedReview}
                recipeId={selectedReview!.recipe._id}
                />
            )}
    </div>
    
  )
}
