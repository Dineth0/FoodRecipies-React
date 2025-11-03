import {Request, Response, NextFunction } from "express";
import { Food } from "../models/Food";
import bucket from "../config/firebase";


export const addFood = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {name, category, description} = req.body
        const files = req.files as Express.Multer.File[]

        if(!files || files.length === 0){
            return res.status(400).json({
                success:false,
                message:"No images Uploaded"
            })
        }

        const existing = await Food.findOne({name})
        if(existing){
            return res.status(400).json({
                success:false,
                data:null,
                message:"Food already exsting"
            })
        }
        const imageUrls = files.map((file)=>(file as any).path)
        const newFood = new Food({
            name,
            category,
            description,
            images:imageUrls
        })
        await newFood.save()
        res.status(201).json({
            success:true,
            data: {food: newFood},
            message: "Food Added Successfully"
        })
    }catch(error){
        next(error)
    }
}