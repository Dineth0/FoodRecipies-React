
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { addFood } from '../../services/FoodAPI';
import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
import { updateFood } from '../../services/FoodAPI'

interface FoodItem{
  _id:string
  name:string
  category:string
  cuisine:string
  description:string
  images: string[]
}

interface FoodsFormProps {
  onClose: () => void;
  onSave: (food : FoodItem) => void
  selectedFood:FoodItem | null
}

interface FormData{
  name: string
  category: string;
    cuisine: string;
    description: string;
}

export const FoodForm: React.FC<FoodsFormProps> = ({ onClose, onSave, selectedFood }) => {
  
  const [formData, setFormData] = useState<FormData>({
    name: selectedFood?.name || '',
    category: selectedFood?.category || '',
    cuisine: selectedFood?.cuisine || '',
    description: selectedFood?.description || ''
  })
  const [existingImageUrls, setExsitingImageUrls] = useState<string[]>(selectedFood?.images || [])
  const [files, setFiles] = useState<FileList | null>(null)

  const[loading, setLoading] =useState(false)
  const[error, setError] = useState<string | null> (null)

  useEffect(() => {
    if(selectedFood){
      setFormData({
        name:selectedFood.name,
        category:selectedFood.category,
        cuisine:selectedFood.cuisine,
        description:selectedFood.description
      })
      setExsitingImageUrls(selectedFood.images || [])
    }else{
      setFormData({
        name : '',
        category : '',
        cuisine : '',
        description : ''
      })
      setExsitingImageUrls([])
    }
  }, [selectedFood])

  const handleChange =(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  )=>{
    const {name, value} = e.target
    setFormData((prevData) =>({
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
      !formData.name ||
      !formData.category ||
      !formData.cuisine ||
      !formData.description 
      
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
      return
    }
    setLoading(true)
    setError(null)

    const data = new FormData()
    data.append('name', formData.name)
    data.append('category', formData.category)
    data.append('cuisine', formData.cuisine)
    data.append('description', formData.description)

    if(files){
    for(let i= 0; i < files.length; i++){
      data.append('images', files[i])
    }
    }

    try{
      let response;
      if(selectedFood) {
        response = await updateFood(selectedFood._id!, data)
        showSuccessAlert('Success','Food Successfully Updated')
      }else{
        response = await addFood(data)
        showSuccessAlert('success', "Food Added Successfully")
      }
      onSave(response.data.data.food)

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
  
  const formTitle = selectedFood ? "Edit Food" : "Add Food"
  const saveButtonText = selectedFood ? "Update" : 'Save'

  return ReactDOM.createPortal (
   
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
   
      <div className="relative bg-gradient-to-br from-[#2a2416]/90 via-[#1a1a1a]/95 to-black/95 border border-yellow-600/30 text-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] w-full max-w-md my-auto">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
          {formTitle}
        </h2>

        <form onSubmit={handleSubmit}  className="space-y-4">
          

          <div className="flex flex-col space-y-1">
            <label className="text-[#fde7c5]/80 text-sm font-medium">Food Title</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"/>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              id="category"
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            >
               <option value="">-- Select Category --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
                <option value="appetizers">Appetizers</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="shorteats">Shorteats</option>
                <option value="meats">Meats</option>
                <option value="sea foods">Sea Foods</option>
                <option value="street food">Street Food</option>
                <option value="traditional">Traditional</option>
                <option value="other">Other</option>

            </select>
            </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Cuisines</label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              id="cuisines"
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            >
               <option value="">-- Select Cuisine --</option>
                <option value="sri_lankan">Sri Lankan</option>
                <option value="indian">Indian</option>
                <option value="korean">Korean</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="italian">Italian</option>
                <option value="thai">Thai</option>
                <option value="mexican">Mexican</option>
                <option value="american">American</option>
                <option value="other">Other</option>

            </select>

          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Description</label>
            <textarea
              name="description"
             value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            />
          </div>
          {existingImageUrls.length > 0 && (
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Current Images</label>
            <div className="flex flex-wrap gap-2 p-2 bg-black/50 rounded-lg border border-yellow-600/20">
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
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            />
          </div> 

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
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
              className="px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-gray-300 hover:bg-black/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold hover:from-yellow-400 hover:to-amber-500 shadow-lg transition"
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
  );
};

export default FoodForm;