import { Router } from "express";
import { addFood } from "../controllers/foodController";
import upload from "../middleware/upload";


const router = Router()
router.post("/addFood", upload.array("images",5),addFood)

export default router