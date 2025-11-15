import { Navigate, Outlet, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home/Home"
import About from "./pages/Home/About"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import CategoryPage from "./pages/Category/CategoryPage"

const App = () =>{
  return (
    <Router>
  <AuthProvider>

    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Route>
      </Route>

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  </AuthProvider>
</Router>

  );
}
export default App
