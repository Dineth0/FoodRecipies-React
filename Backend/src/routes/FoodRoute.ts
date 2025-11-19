import { Router } from "express";
import { addFood, deleteFood, getAllFoods, getFoodsById, updateFood } from "../controllers/foodController";
import upload from "../middleware/upload";
import { authenticateUser, authorizeRole } from "../middleware/authMiddleware";


const router = Router()
router.post(
            "/addFood",
            authenticateUser,
            authorizeRole(["Admin","User"]),
            upload.array("images",5),
            addFood
        )

router.get("/", getAllFoods)
router.put("/updateFood/:id", upload.array("images", 5), updateFood)
router.delete("/deleteFood/:id", deleteFood)
router.get("/getFoodsById/:id", getFoodsById)

export default router