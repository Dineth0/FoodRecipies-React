import { useEffect, useRef, useState } from "react";
import heroPic from "../../assets/recipeHero.png";
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
  <section
    className="min-h-screen w-full bg-cover bg-center relative flex items-center"
    style={{
      backgroundImage: `url(${heroPic})`,
      backgroundPosition: "center 30%" // recipehome.png
    }}
  >
    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Content */}
    <div className="relative z-10 w-full px-8 md:px-20">
      <div className="max-w-xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8">
          Discover & Cook <br />
          Amazing Recipes
        </h1>

        {/* Search box */}
        <div className="relative w-full" ref={dropdown}>
          <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl flex items-center px-5 py-4 border border-white/40">
            <HiMagnifyingGlass className="text-gray-600 text-2xl mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-500 text-lg"
            />
          </div>

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50">
              <ul>
                {suggestions.map((recipe) => (
                  <li
                    key={recipe._id}
                    onClick={() => handleClick(recipe.title)}
                    className="px-5 py-4 hover:bg-orange-50 cursor-pointer flex items-center justify-between transition border-b last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      {recipe.images?.length > 0 ? (
                        <img
                          src={recipe.images[0]}
                          alt={recipe.title}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          
                        </div>
                      )}

                      <span className="font-medium text-gray-800">
                        {recipe.title}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      View recipe
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

}
