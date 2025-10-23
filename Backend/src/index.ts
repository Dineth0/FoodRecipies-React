import { error } from "console"
import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "../src/routes/authRoute"



const app: Application = express()
app.use(cors({origin:"*"}))

app.use(express.json())
app.use("/api/v1/auth", authRoute)
app.get("/",(req: Request, res: Response) =>{
    res.send("Hello TS Express")
}) 
 
const mongo = mongoose.connect("mongodb://localhost:27017/foodRecipies")
mongo.then(() =>{
    console.log("MongoDb Connected")
}).catch((error) =>{
    console.error(error)
})

app.listen(5000, () => {
    console.log("Server running")
})