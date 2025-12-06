import axiosInstance from "./axios"

interface ReviewData{
    user:any
    recipe:string
    rating:number
    description: string
}
export const addReview = (data: ReviewData)=>{
    return axiosInstance.post('/review/addReview', data ,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
export const getReviewByRecipe = (recipeId: string)=>{
    return axiosInstance.get(`/review/byRecipe/${recipeId}`)
}