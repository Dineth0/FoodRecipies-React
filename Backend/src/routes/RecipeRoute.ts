import { Router } from "express";
import upload from "../middleware/upload";
import { addRecipie, getAllRecipes, getRecipeByFood } from "../controllers/recipeController";
import { authenticateUser, authorizeRole } from "../middleware/authMiddleware";


const router = Router()
router.post(
            "/addRecipe",  
            authenticateUser,
            authorizeRole(["Admin","User"]),
            upload.array("images", 5), 
            addRecipie
        )
router.get("/", getAllRecipes)   
router.get("/byfood/:food", getRecipeByFood)     

export default router