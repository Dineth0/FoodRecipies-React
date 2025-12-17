import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import cloudinary from "../config/cloudinary";
import { error } from "console";


 
 
 export const createUser = async (req:Request, res:Response, next:NextFunction) =>{
    const {name, email, password, image, role} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
           message: "Missing required fields" 
        })
    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
           message: "User already exists" 
        })
    }
        const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
        
                const user = new userModel({
                    name,
                    email,
                    password:hashedPassword,
                    image: null,
                    role
                })
                await user.save()
        
        
                res.status(201).json(user);
        
    }catch(error){
        res.status(500).json({ message: "Server error" })

    }
}

export const updateUser = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const {id} = req.params
        const {name, email ,password} = req.body
        const file = req.file

        const existingUSer = await userModel.findById(id)

        if(!existingUSer){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        let updatedImage = existingUSer.image;

        if (file) {
        const uploaded: any = await new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream(
            { folder: "users" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
            );
            upload_stream.end(file.buffer);
        });

        updatedImage = uploaded.secure_url;
        }

        existingUSer.name = name || existingUSer.name
        existingUSer.email = email || existingUSer.email
        existingUSer.password = password || existingUSer.password
        existingUSer.image = updatedImage

        await existingUSer.save()

        res.status(200).json({
            success: true,
            data: {user: existingUSer},
            message: "Food updated successflly"
        })
    }catch(error){
        next(error)
    }
}
 




