import { useEffect, useRef, useState } from "react";
import heroPic from "../../assets/heropic.png";
import { useNavigate } from "react-router-dom";
import { searchRecipes } from "../../services/RecipeAPI";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface searchResult{
_id: string
title : string
images: string

}

export default function HeroSection() {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<searchResult[]>([])
  const [showSuggestions, setShowSuggestion] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchRecipes = async () =>{
      if(query.length > 1){
        try{
          const response = await searchRecipes(query)
          if(response.data.success){
            setSuggestions(response.data.data)
            setShowSuggestion(true)
          }
        }catch(error){
          console.error(error)
        }
      }else{
        setSuggestions([])
        setShowSuggestion(false)
      }
    }
    const timeout = setTimeout(()=>{
      fetchRecipes()
    },300)
    return () => clearTimeout(timeout)
  }, [query])

  useEffect(()=>{
    function handleOutSideClick(event: MouseEvent) {
      if(dropdown.current && !dropdown.current.contains(event.target as Node)){
        setShowSuggestion(false)
      }
    }
    document.addEventListener("mousedown", handleOutSideClick)
    return () => document.removeEventListener("mousedown", handleOutSideClick)
  },[dropdown])

  const handleClick = (title: string)=>{
    navigate(`/recipe/${encodeURIComponent(title)}`)
    setShowSuggestion(false)
  }

  return (
    <section className="min-h-[100vh] flex flex-col md:flex-row items-start justify-between px-8 md:px-20 py-7 relative">
      
   
      <div className="flex flex-col justify-start mt-10 md:mt-20 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2d1b0b] leading-tight mb-6">
          Discover and <br /> Cook Amazing <br /> Recipes
        </h1>

    
        <div className="relative w-full md:w-[420px]" ref={dropdown}>
          <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex items-center p-4 w-full mt-4 border border-white/50">
            <HiMagnifyingGlass className="text-gray-500 text-2xl mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-500 text-lg"
            />
          </div>

       
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
              <ul>
                {suggestions.map((recipe) => (
                  <li
                    key={recipe._id}
                    onClick={() => handleClick(recipe.title)}
                    className="px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 transition-colors border-b last:border-none border-gray-100"
                  >
                 
                    {recipe.images && recipe.images.length > 0 ? (
                        <img 
                            src={recipe.images[0]} 
                            alt={recipe.title} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs">🍳</div>
                    )}
                    
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm md:text-base">
                            {recipe.title}
                        </span>
                        <span className="text-xs text-gray-400">View Recipe</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

  
      <div className="flex md:justify-end w-full md:w-auto mt-7 md:mt-0">
        <img
          src={heroPic}
          alt="Delicious food"
          className="w-[380px] md:w-[480px] lg:w-[520px] rounded-full shadow-2xl border-[10px] border-[#f8e1b8]"
        />
      </div>
    </section>
  );
}
