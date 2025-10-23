import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';


 
 
 export const createUser = async (req:Request, res:Response, next:NextFunction) =>{
    const {name, email, password, role} = req.body

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
                    role
                })
                await user.save()
        
        
                res.status(201).json(user);
        
    }catch(error){
        res.status(500).json({ message: "Server error" })

    }
}
 




