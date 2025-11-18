import axiosInstance from "./axios";


export const addFood = (data: FormData)=>{
    return axiosInstance.post('/food/addFood', data, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const updateFood =  (id: string, data: FormData) =>{
    return axiosInstance.put(`/food/updateFood/${id}`, data,{
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    })
}
export const getAllFoods = async (page: number, limit: number) =>{
    return axiosInstance.get(`/food?page=${page}&limit=${limit}`)
}
export const deleteFood =  (id: string) =>{
    return axiosInstance.delete(`/food/deleteFood/${id}`)
}