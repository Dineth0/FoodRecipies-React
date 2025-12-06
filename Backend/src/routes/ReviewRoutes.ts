import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { addReview, deleteReview, getAllReviews, getReviewByRecipe } from "../controllers/reviewController";


const router = Router()

router.post(
            "/addReview" ,
            authenticateUser,
            addReview
        )       
router.get("/byRecipe/:recipe", getReviewByRecipe)        
router.get("/", getAllReviews)
router.delete("/deleteReview/:id", deleteReview)

 export default router       