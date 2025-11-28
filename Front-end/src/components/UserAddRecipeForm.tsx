import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { addRecipe } from '../services/RecipeAPI';
import { showErrorAlert, showSuccessAlert } from '../utils/SweetAlerts';
import { getAllFoods } from '../services/FoodAPI';
import { useAuth } from '../context/AuthContext';


interface User {
  _id: string;
  name: string;
}

interface Food {
  _id: string;
  name: string;
}
interface RecipeItem{
    _id: string
    user: User
    food: Food
    title:string
    ingredients: string
    step: string
    readyIn : string
    images?: string[]

}
interface FormData{
    food: string
    title:string
    ingredients: string
    step: string
    readyIn : string
 
   
}
interface UserAddRecipeFormProps{
    onClose: () => void
    onSave: (recipe: RecipeItem) => void
    // selectedRecipe : RecipeItem | null
}
export  const UserAddRecipeForm: React.FC<UserAddRecipeFormProps> =({onClose, onSave}) =>{

    const [formdata, setFormdata] = useState<FormData>({
        food:  '',
        title:  '',
        ingredients:  '',
        step:  '',
        readyIn:  ''
    

    })
    const [files, setFiles] = useState<FileList | null>(null)
    const [existingImageUrls, setExsitingImageUrls] = useState<string[]>( [])
    
    const[loading, setLoading] =useState(false)
    const[error, setError] = useState<string | null> (null)
    const [foods, setFoods] = useState<Food[]>([])
    const {user} = useAuth()

    useEffect (()=>{

    
          setFormdata({
          food: '',
          title: '',
          ingredients: '',
          step: '',
          readyIn: ''
          })
          setExsitingImageUrls([])
        
        const loadFoods = async () =>{
            try{
                const res = await getAllFoods()
                setFoods(res.data.data.foods)
            }catch(error){
                console.error(error)
            }
        }
        loadFoods()
        
    },[])

    const handleChange = (
        e : React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement | HTMLSelectElement >
      )=>{
        const {name, value} = e.target
        setFormdata((prevData)=>({
            ...prevData,
            [name] : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setFiles(e.target.files)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        if(
            !formdata.food ||
            !formdata.title ||
            !formdata.ingredients ||
            !formdata.step ||
            !formdata.readyIn
          
        ){
            setError("Fill All Fields")
            return
        }
        if (existingImageUrls.length === 0 && (!files || files.length === 0)) {
            setError("Please add at least one image");
            return;
        }
        const totalImage = existingImageUrls.length + (files ? files.length : 0)
            if(totalImage > 5){
                setError("You can only upload 5 Images")
        }
        setError(null)
        setLoading(true)

        const data = new FormData()
        data.append('user', user?.id || "")
        data.append('food', formdata.food)
        data.append('title', formdata.title)
        // const ingredientsArray = formdata.ingredients.split(",").map(i => i.trim())
        data.append('ingredients', formdata.ingredients)
        data.append('step', formdata.step)
        data.append('readyIn', formdata.readyIn)
      

        if(files){
            for(let i= 0; i < files.length; i++){
                data.append('images', files[i])
            }
        }

        try{
            const response = await addRecipe(data)
                showSuccessAlert('Success','Recipe Successfully Added')
              
              onSave(response.data.data.recipe)
            
        }catch(error: any){
          setLoading(false)
                let errorMessage = 'Faild to add food. Please try again.';
                      if (error.response?.data?.message) {
                        errorMessage = typeof error.response.data.message === 'object'
                          ? JSON.stringify(error.response.data.message)
                          : String(error.response.data.message);
                      }
                      setError(errorMessage);
                      showErrorAlert('Food Add Failed', errorMessage);
                      console.error(' error:', error);  
        }
    }

    const formTitle = "Add Recipe"
    const saveButtonText =  "Save"

  return ReactDOM.createPortal (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01] my-auto">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
          {formTitle}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Food</label>
            <select
              name="food"
              id="food"
              value={formdata.food}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
               <option value="">-- Select Food --</option>
                {foods.map((item)=>(
                    <option key={item._id} value={item._id}>
                        {item.name}
                    </option>
                ))}

            </select>
            </div>
          

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Recipe Title</label>
            <input
              name="title"
                value={formdata.title}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Ingredients</label>
            <input
              name="ingredients"
              value={formdata.ingredients}
              onChange={handleChange}
              placeholder="Enter Ingredients"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Steps</label>
            <textarea
              name="step"
              value={formdata.step}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Ready In</label>
            <input
              name="readyIn"
              value={formdata.readyIn}
              onChange={handleChange}
              placeholder="Enter Ready In"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
 
          {existingImageUrls.length > 0 &&(
             <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Current Images</label>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-lg border border-gray-700">
              {existingImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Existing food ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              You can add more images below.
            </p>
          </div> 
          )}

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Images</label>
            <input
              name="images"
              type="file"
              onChange={handleFileChange}
              multiple
              accept='image/png, image/jpeg, image/webp'
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
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
                disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
                disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
                {loading ? 'Saving...': saveButtonText}
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  )
}
