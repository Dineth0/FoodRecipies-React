import axiosInstance from "./axios";


export const addFood = (data: FormData)=>{
    return axiosInstance.post('/food/addFood', data, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}