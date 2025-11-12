import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axiosInstance from '../services/axios';
import { showErrorAlert, showSuccessAlert, showToast } from '../utils/SweetAlerts';

interface User {
  id: string;
  name: string;
  email: string;
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User  | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a token, fetch the user profile
    if (token) {
      console.log(`AuthProvider Token found ${token}`)
    //   fetchUserProfile();
    }
  }, [token]);

  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axiosInstance.get('/auth/profile');
  //       setUser(response.data.user);
  //       setIsAuthenticated(true);
  //     } catch (error: any) {
  
  //       let errorMessage = 'Failed to fetch profile';
  //       if (error.response?.data?.message) {
  //         errorMessage = typeof error.response.data.message === 'object'
  //           ? JSON.stringify(error.response.data.message)
  //           : String(error.response.data.message);
  //       }
  //       console.error('Error fetching user profile:', errorMessage, error);
  //       // If there's an error fetching the profile, the token might be invalid
  //       logout();
  //     }
  //   };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);  
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      showToast(`Welcome back, ${user.name}!`, 'success');

        if(user.role === 'Admin'){
            navigate('/dashboard')
        }else{
            navigate('/')
        }

    
    } catch (error: any) {
      // Handle error message, ensuring it's a string
      let errorMessage = 'Login failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = typeof error.response.data.message === 'object'
          ? JSON.stringify(error.response.data.message)
          : String(error.response.data.message);
      }
      setError(errorMessage);
      showErrorAlert('Login Failed', errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/auth/signup', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      showSuccessAlert('Account Created', `Welcome to BookClub, ${name}!`);
      navigate('/profile');
    } catch (error: any) {

      let errorMessage = 'Signup failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = typeof error.response.data.message === 'object'
          ? JSON.stringify(error.response.data.message)
          : String(error.response.data.message);
      }
      setError(errorMessage);
      showErrorAlert('Signup Failed', errorMessage);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    showToast('You have been logged out', 'info');
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    token,
    login,
    signup,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};