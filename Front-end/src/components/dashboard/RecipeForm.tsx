import React from 'react'
import ReactDOM from 'react-dom'


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
    ingredients: string[]
    step: string
    readyIn : string
    date: Date
    images?: string[]

}
interface RecipeFormProps{
    onClose: () => void
    onSave: (recipe: RecipeItem) => void
}
export  const RecipeForm: React.FC<RecipeFormProps> =({onClose, onSave}) =>{
  return ReactDOM.createPortal (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01] my-auto">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
        
        </h2>

        <form  className="space-y-4">
          

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Food Title</label>
            <input
              name="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Food Title</label>
            <input
              name="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Food Title</label>
            <input
              name="name"
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Images</label>
            <input
              name="images"
              type="file"
              multiple
              accept='image/png, image/jpeg, image/webp'
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div> 

          

          

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
           
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
           
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
           
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
