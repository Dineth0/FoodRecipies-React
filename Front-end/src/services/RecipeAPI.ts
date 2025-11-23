import axiosInstance from "./axios"

export const getRecipeByFood =  (foodId: string) =>{
    return axiosInstance.get(`/recipe/byfood/${foodId}`)
}

export const getAllRecipes = (page: number , limit : number)=>{
    return axiosInstance.get(`/recipe?page=${page}&limit=${limit}`)
}

export const addRecipe = (data: FormData)=>{
    return axiosInstance.post('/recipe/addRecipe', data, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
}