import { FaStar } from "react-icons/fa";

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

interface ReviewCardProps {
  review : ReviewCardItem
}

export default function ReviewCard({review} : ReviewCardProps){

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
    
    return(
        <div className="border-b border-gray-100 py-6 bg-white rounded-full ">
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold uppercase shadow-sm ml-25">
                        {review.user.name.charAt(0)}
                    </div>
                </div>

                <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-1 ml-1">
                        {review.user.name}
                    </h4>
                
                    <div className="flex gap-1 mb-3 ml-1">
                        {renderStar(review.rating)}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-[15px] mr-4">
                        {review.description}

                    </p>
                </div>    
            </div>
            
        </div>
    )
}