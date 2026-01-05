import { BrowserRouter } from "react-router-dom";
import { store, type AppDisPatch } from "./redux/store";
import Router from "./routes/Routers";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./redux/slices/authSlice";

function AppContent() {
  const dispatch = useDispatch<AppDisPatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
    
  )
}
