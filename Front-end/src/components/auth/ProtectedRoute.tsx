import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

interface ProtectedAuthRoute{
    redirectPath?: string
}

const ProtectedRoute = ({redirectPath ='/login'} : ProtectedAuthRoute)=>{
    const {isAuthenticated, loading} = useAuth()

    if(loading){
        return(
           <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-indigo-600"></div>
      </div>  
        )
    }
    if(!isAuthenticated){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet/>
}
export default ProtectedRoute