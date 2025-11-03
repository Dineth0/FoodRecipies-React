import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/home/Home"
import About from "./pages/home/About"
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/auth/ProtectedRoute"



const App = () =>{
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute/>}>
            <Route
              element={
                <>
                  <Navbar />
                      <Outlet />
                </>
              }
            >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
             
          </Route>
           <Route element={<ProtectedRoute/>}>
                            <Route path="/dashboard" element={<Dashboard />} />

            </Route>
          
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
} 
export default App