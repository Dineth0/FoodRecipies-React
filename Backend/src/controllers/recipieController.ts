import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import {Food} from "../models/FoodModel"
import { Recipie } from "../models/RecipieModel";
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
        const newResipie = new Recipie({
            user,
            food,
            title,
            ingredients : ingredients.split(","),
            step,
            readyIn,
            date : new Date(),
            images: imageUrls
        })
        await newResipie.save()
        res.status(201).json({
            success:true,
            data: {food: newResipie},
            message: "Recipie Added Successfully"
        })
    }catch(error){
        next(error)
    }
}