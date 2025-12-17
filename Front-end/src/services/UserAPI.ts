import axiosInstance from "./axios"

export const updateUser = (id: string, data: FormData) =>{
    return axiosInstance.put(`/auth/updateUser/${id}`,data,{
         headers:{
            'Content-Type': 'form-data'
        }
    })

}