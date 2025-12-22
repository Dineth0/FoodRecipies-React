import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createUser } from '../../services/UserAPI'
import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts'


interface User{
    _id:string
    name:string
    email:string
    password:string
    role:string
    
}
interface FormData{
    name:string
    email:string
    password:string
    role:string
    
}
interface UserFormProps{
  onClose:() => void
  onSave: (user: User) => void
}
export const  UserForm:React.FC<UserFormProps>=({onClose, onSave})=> {

  const[formdata, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password:'',
    role:''
    
  })
  
  const[loading, setLoading] =useState(false)
  const[error, setError] = useState<string | null> (null)

  useEffect(()=>{
    setFormData({
      name: '',
      email:'',
      password:'',
      role:''
    })
    
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    e.preventDefault()
    const {name, value} = e.target
        setFormData((prevData)=>({
            ...prevData,
            [name] : value
        }))
  }
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(
      !formdata.name||
      !formdata.email||
      !formdata.password||
      !formdata.role
    ){
      setError("Fill All Fields")
      return
    }
    setError(null)

    const payload = {
      name : formdata.name,
      email: formdata.email,
      password: formdata.password,
      role: formdata.role

    }
    setLoading(true)

    


    try{
      const response = await createUser(payload)
      showSuccessAlert('Success','User Successfully Added')
      onSave(response.data.data.user)
      onClose()
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
  return ReactDOM.createPortal (
    <div>
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01] my-auto">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
        
        </h2>

        <form onSubmit={handleSubmit}  className="space-y-4">

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Name</label>
            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Email</label>
            <input
              name="email"
             type="email"
             value={formdata.email}
             onChange={handleChange}
              placeholder="Enter Email"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>


          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Password</label>
            <input
              name="password"
             type="password"
             value={formdata.password}
             onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Role</label>
            <select
              name="role"
              id="role"
              value={formdata.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
               <option value="">-- Select Role --</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>

            </select>
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
                {loading ? 'Saving...': "Save"}
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
    
    </div>,
    document.body
  )
}
export default UserForm
