import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { addReview, getreviewByRecipe } from "../controllers/reviewController";


const router = Router()

router.post(
            "/addReview" ,
            authenticateUser,
            addReview
        )       
router.get("/byRecipe/:recipe", getreviewByRecipe)        

 export default router       