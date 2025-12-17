import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import { updateUser } from "../services/UserAPI"
import { showSuccessAlert, showErrorAlert } from '../utils/SweetAlerts';

interface User{
    _id: string
    name:string
}

interface UserItem{
    user:User
    id:string
    name:string
    email:string
    image?: string
}
interface FormData{
    name:string
    email:string
    image?: string
}
interface UserFormProps{
    onClose: () => void
    onSave:(user:UserItem) => void
    editUser : UserItem | null

}

export const ProfileForm: React.FC<UserFormProps> = ({onClose,onSave,editUser
}) => {
    const [formdata, setFormdata] = useState<FormData>({
        name: editUser?.name || '',
        email: editUser?.email || ''

    })
    const [file, setFile] = useState<FileList | null>(null)
    const [existingImageUrl, setExsitingImageUrl] = useState<string>(editUser?.image || '')
    const[loading, setLoading] =useState(false)
    const[error, setError] = useState<string | null> (null)

    useEffect(()=>{
        if(editUser){
            setFormdata({
                name: editUser.name,
                email : editUser.email,
                
            })
            setExsitingImageUrl(editUser.image || '')
        }
    },[editUser])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setFile(e.target.files)
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name , value} = e.target
        setFormdata((prevData)=>({
            ...prevData,
            [name] : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(
            !formdata.name||
            !formdata.email
        ){
            setError("Fill All Fields")
            return
        }
        if (!editUser || !editUser.id) {
        setError("User ID not found. Please try again.")
        console.error("User ID is missing in editUser object:", editUser);
        return;
        }

        // if(existingImageUrl.length === 0 (!file || file.length === 0)){
        //     setError()
        // }

        setError(null)
        setLoading(true)

        const data = new FormData()
        data.append('name', formdata.name)
        data.append('email', formdata.email)

        if (file && file.length > 0) {
            data.append("image", file[0])
        }


        try{
            const response = await updateUser(editUser.id , data)
            showSuccessAlert('Success','Recipe Successfully Updated')
            onSave(response.data.data.user)
            onClose()
        }catch(error :any){
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
    
     
    return ReactDOM.createPortal(
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
                <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01] my-auto">
                    <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
                        Edit Your Profile
                    </h2>
    
                    <form  onSubmit={handleSubmit} className="space-y-4">
    
                        <div className="flex flex-col space-y-1">
                            <label className="text-gray-300 text-sm">Your Rating</label>
                            <input
                                name="name"
                                value={formdata.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
                            </input>
                        </div>
    
            
                        <div className="flex flex-col space-y-1">
                            <label className="text-gray-300 text-sm">Enter Your Name</label>
                            <input
                                name="email"
                                value={formdata.email}
                                type="email"
                                onChange={handleChange}
                                placeholder="Enter Email"
                                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none">
                            </input>
                        </div>

                        {
                            existingImageUrl.length > 0 && (
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-300 text-sm">Current Image</label>
                                    <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-lg border border-gray-700">
                                        {existingImageUrl && (
                                            <div className="flex flex-col space-y-1">
                                                <label className="text-gray-300 text-sm">Current Image</label>
                                                <img
                                                src={existingImageUrl}
                                                alt="Profile"
                                                className="w-32 h-32 object-cover rounded-full"
                                                />
                                            </div>
                                        )}

                                    </div>
                                    <p className="text-xs text-gray-400">
                                        You can add more images below.
                                    </p>
                                </div>
                            )
                        }

                        <div className="flex flex-col space-y-1">
                            <label className="text-gray-300 text-sm">Images</label>
                            <input
                                name="image"
                                type="file"
                                onChange={handleFileChange}
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
                               
                            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                            >
                            Cancel
                            </button>
                            <button
                            type="submit"
                                
                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition"
                            >
                                {loading ? 'Saving...': "Save"}
                            </button>
                        </div>
                    </form>
    
                </div>
            </div>,
            document.body
        )
}
