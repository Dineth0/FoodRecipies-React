import axios from "axios";



const axiosInstance = axios.create({
    baseURL : "http://localhost:5000/api/v1",
    headers :{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) =>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) =>{
        return response
    },
    (error)=>{
        if(error.response){
            console.error(`API Error [${error.config?.method?.toUpperCase()}] ${error.config?.url}: ${error.response.status}`);
            if (error.response.status === 401 || error.response.status === 403) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
        }else if(error.request){
                  console.error('API Request Error - No Response');
        }else{
                  console.error('API Request Setup Error:', error.message);
        }
        return Promise.reject(error)
    }
)
export default axiosInstance