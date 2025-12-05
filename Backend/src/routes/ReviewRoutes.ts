import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { addReview } from "../controllers/reviewController";


const router = Router()

router.post(
            "/addReview" ,
            authenticateUser,
            addReview
        )       

 export default router       