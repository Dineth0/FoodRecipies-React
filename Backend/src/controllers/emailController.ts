import dotenv from 'dotenv';
import nodemailer from "nodemailer"

dotenv.config()

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendApprovalemail = async (email: string, userName: string, recipeTitle: string) =>{
    try{
        const sendEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recipe Approved!",
            html:`
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Congratulations ${userName}!</h2>
                    <p>Great news! Your recipe <strong>"${recipeTitle}"</strong> has been approved by our admins.</p>
                    <p>It is now public and visible to everyone.</p>
                    <br/>
                    <p>Thank you for contributing!</p>
                    <p>The Recipe App Team</p>
                </div>
            `
        }
        await transporter.sendMail(sendEmail)
    }catch(error){
        console.error("Error sending Email" , error)
    }
}

export const sendRejectEmail = async (email: string, userName: string, recipeTitle: string) =>{
    try{
        const sendEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recipe Rejected!",
            html:`
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Dear ${userName}!</h2>
                    <p>Bad news! Your recipe <strong>"${recipeTitle}"</strong> has been Rejected by our admins.</p>
                    <p>Try again to Add Your new Recipe</p>
                    <br/>
                    <p>Thank you for contributing!</p>
                    <p>The Recipe App Team</p>
                </div>
            `
        }
        await transporter.sendMail(sendEmail)
    }catch(error){
        console.error("Error sending Email" , error)
    }
}