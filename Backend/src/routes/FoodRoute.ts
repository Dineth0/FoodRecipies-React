import { Router } from "express";
import { addFood } from "../controllers/foodController";
import upload from "../middleware/upload";
import { authenticateUser, authorizeRole } from "../middleware/authMiddleware";


const router = Router()
router.post("/addFood",
            authenticateUser,
            authorizeRole(["Admin","User"]),
            upload.array("images",5),
            addFood)

export default router