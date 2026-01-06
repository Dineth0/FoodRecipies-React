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
    
    return (
    <div className="group bg-[#2d1b0b]/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-[#f59e0b]/30 transition-all duration-300 shadow-xl mb-4">
      <div className="flex gap-5 items-start">
       
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#b45309] to-[#f59e0b] flex items-center justify-center text-[#2d1b0b] text-lg font-black uppercase shadow-lg border border-white/10">
            {review.user?.name?.charAt(0)}
          </div>
        </div>

    
        <div className="flex-1">
          <div className="flex flex-col mb-2">
            <h4 className="text-sm font-bold text-[#f3e8dd] tracking-wider uppercase">
              {review.user?.name}
            </h4>
            <div className="flex gap-1 mt-1">
              {renderStar(review.rating)}
            </div>
          </div>
          
       
          <div className="relative mt-2">
            <p className="text-[#7B542F] leading-relaxed text-[15px] italic">
              {review.description}
            </p>
          </div>
          
          {/* Subtle branding or date could go here */}
          <div className="mt-4 border-t border-white/5 pt-2">
             <span className="text-[10px] text-[#634832] font-bold uppercase tracking-widest">Verified Foodie</span>
          </div>
        </div>
      </div>
    </div>
  )
}