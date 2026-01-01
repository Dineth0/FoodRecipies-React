import type React from "react"
import { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import { useAuth } from "../../context/AuthContext"
import { addReview, updateReview } from "../../services/ReviewAPI"
import { showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"



interface User{
    _id:string
    name: string
}

interface Recipe{
    _id: string
    title: string
}

interface ReviewItem{
    _id : string
    user:User
    recipe:Recipe
    rating: number
    description: string
}



interface ReviewFormProps{
    onClose: () => void
    onSave: (review: ReviewItem) => void
    recipeId : string
    selectedReview : ReviewItem | null
}



export const ReviewForm : React.FC<ReviewFormProps> = ({onClose, onSave, recipeId, selectedReview}) =>{

    const [hover, setHover] = useState(0)
    const [rating, setRating] = useState(0)
    const[description, setDescription] = useState<string>("")
    const[loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {user} = useAuth()
   
    

    useEffect (() =>{
        if(selectedReview){
           setRating(selectedReview.rating)
           setDescription(selectedReview.description)
        }else{
            setRating(0)
            setDescription("")
        }
    },[selectedReview])

    const handlesubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(rating === 0|| !description.trim()){
            setError("Please enter Rating and Your Review")
            return
        }

        const payload = {
            user: user?.id,
            recipe: recipeId,
            rating,
            description
        }
        setLoading(true)
        try{
            let response;
            if(selectedReview){
                 response = await updateReview(selectedReview._id, payload)
                 
            }else{
                response = await addReview(payload)
            }
            showSuccessAlert('Success', selectedReview ? 'Review Updated' : 'Review Added');
            onSave(response.data.data.review);
            onClose();
            
            
        }catch(error: any){
            setLoading(false)
                            let errorMessage = 'Faild to add Review. Please try again.';
                                  if (error.response?.data?.message) {
                                    errorMessage = typeof error.response.data.message === 'object'
                                      ? JSON.stringify(error.response.data.message)
                                      : String(error.response.data.message);
                                  }
                                  setError(errorMessage);
                                  showErrorAlert('Review Add Failed', errorMessage);
                                  console.error(' error:', error);  
        }

    }


    const formTitle = "Add Review"
    const saveButtonText =  "Save"
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
            <div className="relative bg-gradient-to-br from-[#2a2416]/90 via-[#1a1a1a]/95 to-black/95 border border-yellow-600/30 text-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] w-full max-w-md my-auto">
                <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
                    {formTitle}
                </h2>

                <form  onSubmit={handlesubmit} className="space-y-4">

                    <div className="flex flex-col space-y-1">
                        <label className="text-gray-300 text-sm">Your Rating</label>
                        <div className="flex">
                            {[1,2,3,4,5].map((star)=>(
                                <button
                                    type="button"
                                    key={star}
                                    onClick={()=> setRating(star)}
                                    onMouseEnter={()=>setHover(star)}
                                    onMouseLeave={()=>setHover(0)}
                                    
                                    className={`text-2xl ${
                                                star <= (hover || rating) ? "text-yellow-400" : "text-gray-500"
                                                 } transition-colors`}>
                                     ★    
                                </button>
                            ))}
                        </div>
                    </div>

        
                    <div className="flex flex-col space-y-1">
                        <label className="text-gray-300 text-sm">Enter Your Review</label>
                        <textarea
                        name="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                        />
                    </div>

    
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            </div>
                            <div className="ml-3">
                            <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                        type="button"
                        onClick={onClose}
                           
                        className="px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-gray-300 hover:bg-black/80 transition"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                            
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold hover:from-yellow-400 hover:to-amber-500 shadow-lg transition"
                        >
                            {loading ? 'Saving...': saveButtonText}
                        </button>
                    </div>
                </form>

            </div>
        </div>,
        document.body
    )
}


