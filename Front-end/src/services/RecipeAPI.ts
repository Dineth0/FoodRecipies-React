import axiosInstance from "./axios"

export const getRecipeByFood =  (foodId: string) =>{
    return axiosInstance.get(`/recipe/byfood/${foodId}`)
}

export const getAllRecipes = (page: number , limit : number)=>{
    return axiosInstance.get(`/recipe?page=${page}&limit=${limit}`)
}