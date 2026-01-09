import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { refreshTokens } from "./UserAPI";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}


const axiosInstance = axios.create({
    baseURL :"https://incredible-carlie-dinethnakandala-d9594667.koyeb.app/api/v1",
    headers :{
        "Content-Type":"application/json"
    }
    
})

export const forgetPassword = async (email : string) =>{
    return axiosInstance.post("/auth/forgot-password",{email})
}
export const passwordReset = async (data:{email:string, otp:number, newPassword:string}) =>{
    return axiosInstance.post("/auth/reset-password", data)
}

const PUBLIC_ENDPOINTS = ["/auth/login" , "/auth/signup"]
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    async(error: AxiosError) =>{
        const originalRequest = error.config as CustomAxiosRequestConfig;

        const isPublic = PUBLIC_ENDPOINTS.some((url)=>
            originalRequest.url?.includes(url)
        );

        if(error.response?.status === 401 && !isPublic && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const refreshtoken = localStorage.getItem("refreshToken");
                if (!refreshtoken) throw new Error("No refresh token");

                const response = await refreshTokens(refreshtoken);
                
                const newToken = response.token || response.accessToken; 
                
                localStorage.setItem('token', newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return axiosInstance(originalRequest);
            }catch(error){
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
export default axiosInstance