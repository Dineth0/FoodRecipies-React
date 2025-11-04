import { Router } from "express";
import upload from "../middleware/upload";
import { addRecipie } from "../controllers/recipieController";


const router = Router()
router.post("/addRecipie", upload.array("images", 5), addRecipie)

export default router