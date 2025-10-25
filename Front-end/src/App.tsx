import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home/Home"
import About from "./pages/Home/About"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/auth/ProtectedRoute"



const App = () =>{
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 🟢 Public routes (no Navbar / layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 🔒 Protected routes (with Navbar + layout) */}
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