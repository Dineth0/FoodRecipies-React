import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import {Food} from "../models/FoodModel"
import { Recipe } from "../models/RecipeModel";
import { error } from 'console';


export const addRecipie = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {user, food, title, ingredients, step, readyIn, date} = req.body
        
        const exstingUser = await userModel.findById(user)
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
            images: imageUrls
        })
        await newResipe.save()
        res.status(201).json({
            success:true,
            data: {food: newResipe},
            message: "Recipie Added Successfully"
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
        const recipe = await Recipe.find({food})
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
        data: { recipe },
        message: "Recipe fetched successfully",
        })
    }catch(error){
        next(error)
    }
}