import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
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
          <Route
            element={
              <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
                  <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-white/10 p-8 transition-all duration-300">
                    <ProtectedRoute />
                  </div>
                </div>
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace></Navigate>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
} 
export default App