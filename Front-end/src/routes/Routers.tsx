
import { lazy, Suspense, type ReactNode } from "react"
import {  Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Dashboard from "../pages/Dashboard/Dashboard"
import Layout from "../components/Layout"
import FoodPage from "../pages/food/FoodDetailPage"
import RecipeDeatilsPage from "../pages/Recipe/RecipeDetails"
import MyRecipes from "../pages/Recipe/MyRecipes"
import MyReview from "../pages/review/MyReview"



const Login = lazy(() => import("../pages/auth/Login"))
const Signup = lazy(() => import("../pages/auth/Signup"))
const Home = lazy(() => import("../pages/Home/Home"))
const CategoryPage = lazy(() => import("../pages/Category/CategoryPage"))

type RequireAuthTypes = { children: ReactNode}

const RequireAuth = ({ children}: RequireAuthTypes) =>{

    const {user, loading} = useAuth()

    if(loading){
        return(
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        )
    }
    if(!user){
        return <Navigate to="/login"/>
    }

    return<>{children}</>
}

export default function Router(){
    return(
     
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
              }>
              
                <Routes>
                    
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/signup" element={<Signup/>}></Route>

                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}></Route>
                        
                        <Route
                            path="/category/:category"
                            element={
                                <RequireAuth>
                                    <CategoryPage/>
                                </RequireAuth>
                        }/>
                        <Route
                            path="/foodpage/:name"
                            element={
                                <RequireAuth>
                                    <FoodPage/>
                                </RequireAuth>
                        }/>
                        <Route
                            path="/recipe/:title"
                            element={
                                <RequireAuth>
                                    <RecipeDeatilsPage/>
                                </RequireAuth>
                        }/>
                        <Route
                            path="/my-recipes"
                            element={
                                <RequireAuth>
                                    <MyRecipes/>
                                </RequireAuth>
                        }/>
                        <Route
                            path="/my-review"
                            element={
                                <RequireAuth>
                                    <MyReview/>
                                </RequireAuth>
                        }/>
                    </Route>

                    

                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard/>
                            </RequireAuth>
                        }
                    />

                      
                </Routes>
               
            </Suspense>
       
    )
}