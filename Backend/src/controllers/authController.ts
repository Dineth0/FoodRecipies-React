import jwt, {Secret} from 'jsonwebtoken';
import userModel, {IUser} from '../models/userModel';
import config from "../config/jwt"
import bcrypt from 'bcrypt'
import {Request, Response, NextFunction } from 'express';

//Generate access Token
const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user.id, name: user.email, role: user.role },
    config.JWT_SECRET as Secret,
    { expiresIn: "4h" }
  )
}
// user Signup
const signup = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            const error = new Error('USer with this email already exists');
            (error as any).statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
        })
        await newUser.save()

        res.status(201).json({
            success: true,
            message: 'Librarian registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }catch(error){
        next(error)
    }
}

//user Login
const login = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            const error = new Error('Invalid credentials');
            (error as any).statusCode = 401;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            const error = new Error('Invalid credentials');
            (error as any).statusCode = 401;
            throw error;
        }

        const token = generateAccessToken(user)

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
    }catch(error){
        next(error)
    }
}
export {signup, login}