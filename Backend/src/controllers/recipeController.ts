import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import {Food} from "../models/FoodModel"
import { Recipe } from "../models/RecipeModel";
import { error } from 'console';
import cloudinary from "../config/cloudinary";


export const addRecipie = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {user, food, title, ingredients, step, readyIn, date} = req.body
        
        const exstingUser = await userModel.findById(user)
        const userRole = (req as any).user.role
        const checkStatus = userRole === 'Admin' ? 'Approved' : 'Pending'

        if(!exstingUser){
            return res.status(404).json({
                success: false,
                data:null,
                message:"User Not Found"
            })
        }

        const exstingFood = await Food.findById(food)
        if(!exstingFood){
            return res.status(404).json({
                success: false,
                data:null,
                message:"Food Not Found"
            })
        }

        const files = req.files as Express.Multer.File[]
        const imageUrls = files.map((file)=>(file as any).path)
        const newResipe = new Recipe({
            user,
            food,
            title,
            ingredients : ingredients.split(","),
            step,
            readyIn,
            date : new Date(),
            images: imageUrls,
            status: checkStatus
        })
        await newResipe.save()
        const message = userRole === 'Admin' ? "Recipe Added Successfully" : "Recipes Submitted for Approval"
        res.status(201).json({
            success:true,
            data: {recipe: newResipe},
            message: message
        })
    }catch(error){
        next(error)
    }
}

export const getAllRecipes = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        const skip = (page -1) * limit

        const recipes = await Recipe.find()
                .populate("user", "name")
                .populate("food","name")
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
        const total = await Recipe.countDocuments()
        
        res.status(200).json({
            success: true,
            data: { recipes },
            message: "Recipes fetched successfully",
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page
        })
    }catch(error){
        res.status(500).json({
            success: false,
            data: null,
            message: "Error fetching Recipes",
            error,
        })
    }
}

export const getRecipeByFood = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {food} = req.params
        const recipe = await Recipe.find({food: food, status: 'Approved'})
        .populate("user", "user")
        .populate("food", "name")
        if(!recipe){
            return res.status(404).json({
                 success: false,
                data:null,
                message:"Recipe Not Found"
            })
        }
        res.status(200).json({
        success: true,
        data: { recipes: recipe },
        message: "Recipe fetched successfully",
        })
    }catch(error){
        next(error)
    }
}

export const updateRecipe = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const { food, title, ingredients, step, readyIn} = req.body
        const files = req.files as Express.Multer.File[]

        const existingRecipe = await Recipe.findById(id)
        if(!existingRecipe){
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            })
        }

        let updatedImages = existingRecipe.images 
        if(files && files.length > 0){
            const newImagesUrls = files.map((file) => (file as any).path)
            updatedImages = [...existingRecipe.images ?? [], ...newImagesUrls]

        }
        
        existingRecipe.food = food || existingRecipe.food
        existingRecipe.title = title || existingRecipe.title
        existingRecipe.ingredients = ingredients || existingRecipe.ingredients
        existingRecipe.step = step || existingRecipe.step
        existingRecipe.readyIn = readyIn || existingRecipe.readyIn
        existingRecipe.images = updatedImages

        await existingRecipe.save()

        res.status(200).json({
             success: true,
            data: {food: existingRecipe},
            message: "Recipe updated successflly"
        })
    }catch(error){
        next(error)
    }
}

export const deleteRecipe = async (req:Request, res:Response, next:NextFunction)  =>{
    try{
        const {id} = req.params

        const existingRecpe = await Recipe.findById(id)
        if(!existingRecpe){
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            })
        }
        for (const imageUrl of existingRecpe.images ?? []){
            try{
                const parts = imageUrl.split("/")
                const filename = parts[parts.length - 1]
                const publicId = `recipe/${filename.split("."[0])}`
                await cloudinary.uploader.destroy(publicId)
            }catch(error){
                console.error(error)
            }
        }

        await Recipe.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message:"Recipe deleted successfully" 
        })
    }catch(error){
        next(error)
    }
}

export const getRecipeByTitle = async (req:Request, res: Response, next:NextFunction) =>{
    try{
        const {title} = req.params

        const decodedTitle = decodeURIComponent(title)
        const recipe = await Recipe.findOne({title: decodedTitle})

        if(!recipe){
             return res.status(404).json({
                success: false,
                message: "Recipe not found",
            })
        }
        res.status(200).json({
            success: true,
            data: { recipe },
            message: "Recipe fetched successfully",
        })
    }catch(error){
        next(error)
    }
}

export const getPandingRecipes = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const page = parseInt(req.query.page as string) || 1
        const limit  = parseInt(req.query.limit as string) || 3
        const skip = (page -1) * limit
        const recipes = await Recipe.find({ status: 'Pending'})
        .populate("user", "name")
        .populate("food", "name")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        const total = await Recipe.countDocuments()


        res.status(200).json({
            success:true,
            data:{recipes},
            message: "Get Pneding Recipes",
            totalPages: Math.ceil(total / limit),
            totalCount: total,
            page
        })
    }catch(error){
        next(error)
    }
}

export const approveRecipe = async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const {id} = req.params

        const recipe = await Recipe.findByIdAndUpdate(
            id,
            {status: 'Approved'},
            {new: true}
        )

        if(!recipe){
            return res.status(404).json({
                success:false,
               
                message: "Recipe not found"
            })
        }

        res.status(404).json({
             success:true,
            data:{recipe},
            message: "Recipe Approved Succesfully"
        })
    }catch(error){
        next(error)
    }
}