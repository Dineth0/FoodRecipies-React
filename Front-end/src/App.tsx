import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/Routers";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Router/>
    </AuthProvider>
    </BrowserRouter>
    
  )
}
