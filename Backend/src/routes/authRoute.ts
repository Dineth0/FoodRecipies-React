import { getProfile, login, signup } from "../controllers/authController";
import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";


const authRouter = Router()
authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get("/me", authenticateUser,getProfile)

export default authRouter