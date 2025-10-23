import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home/Home"
import About from "./pages/Home/About"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"



const App = () =>{
  return(
      <Router>
       
        <Navbar />
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-white-900 to-gray-900 text-white p-18">
            <div  className="max-w-7xl mx-auto backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
              <div className="p-13 md:p-8 transition-all duration-300">
                <Routes>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/signup" element={<Signup/>}></Route>

                

                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                  
                </Routes>
              </div>
            </div>
          </div>
      
      </Router>
  )
} 
export default App