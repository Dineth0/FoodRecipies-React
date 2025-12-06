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

export const getAllReviews  = (page: number =1, limit: number =100 )=>{
    return axiosInstance.get(`/review?page=${page}&limit=${limit}`)
}
export const deleteReview  = (id:string )=>{
    return axiosInstance.delete(`/review/deleteReview/${id}`)
}
