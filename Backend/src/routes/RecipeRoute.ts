import { Router } from "express";
import upload from "../middleware/upload";
import { addRecipie, approveRecipe, deleteRecipe, getAllRecipes, getPandingRecipes, getRecipeByFood, getRecipeByTitle, getRecipeByUser, getTotalRecipesCount, rejectRecipes, updateRecipe } from "../controllers/recipeController";
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
router.put("/updateRecipe/:id", upload.array("images", 5), updateRecipe)
router.delete("/deleteRecipe/:id", deleteRecipe)
router.get("/title/:title", getRecipeByTitle)

router.get(
        "/pending",
        authenticateUser,
        authorizeRole(["Admin"]),
        getPandingRecipes
        )
    
 router.put(
        "/approved/:id",
        authenticateUser,
        authorizeRole(["Admin"]),
        approveRecipe
 )  
 router.put(
       "/rejected/:id",
       authenticateUser,
       authorizeRole(["Admin"]),
       rejectRecipes
 )   
 router.get(
       "/myRecipe",
       authenticateUser,
       getRecipeByUser
 )  
 router.get("/getTotalRecipesCount",getTotalRecipesCount)
 
export default router