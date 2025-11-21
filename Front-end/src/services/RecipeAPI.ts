import axiosInstance from "./axios"

export const getRecipeByFood =  (foodId: string) =>{
    return axiosInstance.get(`/recipe/byfood/${foodId}`)
}