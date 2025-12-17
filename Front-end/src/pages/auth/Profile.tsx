import { useAuth } from "../../context/AuthContext"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { ProfileForm } from "../../components/ProfileForm";



interface UserItem{
  
    id:string
    name:string
    email:string
    image?: string
}

export default function Profile() {

const {user, updateUser} = useAuth()
const [editUser, setEditUser] = useState<UserItem | null>(null)
const [showForm, setShowForm] = useState(false)


const handleEditProfile = (user: UserItem)=>{
    console.log(user)
    setEditUser(user)
    setShowForm(true)
}
const handleSavedUser = ( updatedUser: UserItem) =>{
    if(user)
    updateUser({
    ...user,
    id: updatedUser.id ,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image
   
  });
}
const handleCloseForm = () =>{
    setEditUser(null)
    setShowForm(false)
}

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-15">
        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg flex">

            <div className="w-64 border-r p-6 bg-white">
               
                <h2 className="text-lg font-semibold mb-4">
                    Hello {user?.name}
                </h2>

                <div className="text-sm text-gray-600 space-y-3">
                    <div className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100">
                        Manage My Account
                    </div>
                    <button className="block w-full text-left py-2 px-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                        My Profile
                    </button>
                </div>
            </div>

            <div className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-10">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
                    <div className="flex items-start gap-4">
                        <div className="text-blue-600 text-2xl"><FaUser /></div>
                        <div>
                            <p className="font-semibold text-lg">Full Name</p>
                            <p className="mt-1 text-gray-800">{user?.name}</p>
                        </div> 
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="text-blue-600 text-2xl"><MdEmail /></div>
                        <div>
                            <p className="font-semibold text-lg">Email</p>
                            <p className="mt-1 text-gray-800">{user?.email}</p>
                        </div> 
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="text-blue-600 text-2xl"><CgProfile /></div>
                        <div>
                            <p className="font-semibold text-lg mb-3">Profile Picture</p>
                            <div className="w-40 h-40 bg-yellow-100 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                                {user?.image ? (
                                    <img 
                                        src={user.image}
                                        alt="profile"
                                        className="w-full h-full object-cover"/>
                                    
                                ):(
                                    <span className="text-4xl font-semibold text-yellow-800">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div> 
                    </div>
                    

                    
                </div>
                 <button className="mt-10 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition cursor-pointer "
                 onClick={()=> user && handleEditProfile(user)}>
            EDIT PROFILE
          </button>
            </div>
        </div> 
        {
            showForm && (
                <ProfileForm 
                onClose={handleCloseForm}
                onSave={handleSavedUser}
                editUser = {editUser}/>
            )
        }
    </div>
  )
}
