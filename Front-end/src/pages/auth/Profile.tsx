import { useAuth } from "../../context/AuthContext"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";




export default function Profile() {

const {user} = useAuth()

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
                            <div className="w-11 h-11 bg-yellow-100 w-40 h-40 text-yellow-800 font-semibold rounded-full 
                                flex items-center text=md justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer align-center">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        </div> 
                    </div>

                    
                </div>
            </div>
        </div> 
    </div>
  )
}
