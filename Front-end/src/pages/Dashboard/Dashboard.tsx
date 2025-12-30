import  { useEffect, useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import Tab from '../../components/dashboard/Tab'
import Foods from '../../components/dashboard/Food';
import Recipie from '../../components/dashboard/Recipe';
import User from '../../components/dashboard/User';
// import NavButton from '../../components/dashboard/NavButton';
import PendingRecipes from '../../components/dashboard/PendingRecipes';
import NotificationBell from '../../components/dashboard/NotifyBell';
import  Review  from '../../components/dashboard/Review';
import { getTotalFoodsCount } from '../../services/FoodAPI';
import { getTotalRecipesCount } from '../../services/RecipeAPI';
import { getTotalReviewsCount } from '../../services/ReviewAPI';
import { getTotalUsersCount } from '../../services/UserAPI';
import Home from '../../components/dashboard/Home';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

type TabType = "home" | "foods" | "recipies" | "users" | "reviews" | "Peending Recipes"

// interface Stats 
//   totalFoods = number
//   totalRecipies: number
//   totalComments: number
//   totalUsers: number
// }
export default function Dashboard() {
    const {user, isAuthenticated, logout} = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [stats, setStats] = useState({
    totalFoods: 30,
    totalRecipies: 30,
    totalReviews: 30,
    totalUsers: 3,
  })

  useEffect(()=>{
    const loadTotalFoodsCount = async ()=>{
      try{
        const res = await getTotalFoodsCount()
        setStats(prev => ({
          ...prev,
          totalFoods:res.data.data.totalFoods
        }))
      }catch(error){
        console.error(error)
      }
    }
    loadTotalFoodsCount()

    const loadTotalRecipesCount = async ()=>{
      try{
        const res = await getTotalRecipesCount()
        setStats(prev => ({
          ...prev,
          totalRecipies:res.data.data.totalRecipes
        }))
      }catch(error){
        console.error(error)
      }
    }
    loadTotalRecipesCount()

    const loadTotalReviewsCount = async ()=>{
      try{
        const res = await getTotalReviewsCount()
        setStats(prev => ({
          ...prev,
          totalReviews:res.data.data.totalReviews
        }))
      }catch(error){
        console.error(error)
      }
    }
    loadTotalReviewsCount()

    const loadTotalUsersCount = async ()=>{
      try{
        const res = await getTotalUsersCount()
        setStats(prev => ({
          ...prev,
          totalUsers:res.data.data.totalUsers
        }))
      }catch(error){
        console.error(error)
      }
    }
    loadTotalUsersCount()
  })


  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0A0A0A] to-[#4A3B00] text-white p-8">

      <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>Foods and Recipes</h1>

          <div className='flex items-center gap-4'>
              <NotificationBell/>
                <div>
          {isAuthenticated && user ? (
            <div className="relative group">

              <button className="w-11 h-11  text-yellow-800 font-semibold rounded-full 
                                flex items-center justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"/>
                ):(
                  <span className="text-4xl font-semibold text-yellow-800">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span> 
                )}
              </button>

              
              <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg rounded-xl text-gray-800 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-300 py-4 z-50 ">

                <div className="mx-auto w-24 h-24 bg-yellow w-40 h-40 text-yellow-800 font-semibold rounded-full 
                                flex items-center text=md justify-center shadow-md 
                                hover:shadow-lg transition-all duration-300 cursor-pointer align-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"/>
                ):(
                  <span className="text-4xl font-semibold text-yellow-800">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span> 
                )}
                </div>              

                <p className="px-4 py-2 text-sm text-center font-medium border-b">{user.name.split(" ")[0]}</p>

                 <Link
                   to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                 >
                   Profile
                 </Link> 

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-yellow-700 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

          
    
      
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Foods" value={stats.totalFoods} icon="🍛" />
        <StatsCard title="Total Recipies" value={stats.totalRecipies} icon="📜" />
        <StatsCard title="Total Comments" value={stats.totalReviews} icon="📝" />
        <StatsCard title="Total Users" value={stats.totalUsers} icon="👨" />
      </div>

      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            {(["home","foods","recipies","users","reviews","Peending Recipes"]as TabType[]).map((tab)=>(
              <Tab
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              active={activeTab === tab}
              onClick={() =>setActiveTab(tab)}
              >
              </Tab>
              
            ))}


          </div>
        </div>

        {activeTab === 'home' && <Home/>}

        {activeTab === 'foods' && <Foods/>}
        {activeTab === 'recipies' && <Recipie/>}
        {activeTab === 'users' && <User/>}
        {activeTab === 'reviews' && <Review/>}
        {activeTab === 'Peending Recipes' && <PendingRecipes/>}

      </div>

      {/* <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 bg-[#3A2E00] rounded-full backdrop-blur-md px-8 py-3 flex space-x-6">
        {(["home","foods","recipies","users","comments"]as TabType[]).map((tab)=>(
              <NavButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              active={activeTab === tab}
              onClick={() =>setActiveTab(tab)}
              >
              </NavButton>
            ))}
      </div> */}
    </div>
  );
}


