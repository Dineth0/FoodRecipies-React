import { error } from "console"
import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "../src/routes/authRoute"
import FoodRoute from "../src/routes/FoodRoute"
import RecipeRoute from "./routes/RecipeRoute"
import NotifyRoute from "./routes/NotifyRoutes"
import ReviewRouter from "./routes/ReviewRoutes"
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
dotenv.config();



const app: Application = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET","POST","PUT","DELETE"]
    }
})
app.set("io",io)

io.on("connection",(socket)=>{
    console.log("User connected", socket.id)

    socket.on("join_admin_room", () =>{
        socket.join("admin")
        console.log(`User ${socket.id} joind admin`)
    })
    socket.on("disconnect", ()=>{
        console.log("User disconnected", socket.id)
    })
})

app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/api/v1/auth", authRoute)
app.get("/",(req: Request, res: Response) =>{
    res.send("Hello TS Express")
}) 
app.use("/api/v1/food", FoodRoute)
app.use("/api/v1/recipe", RecipeRoute )
app.use("/api/v1/notification",NotifyRoute)
app.use("/api/v1/review",ReviewRouter)



const mongo = mongoose.connect("mongodb://localhost:27017/foodRecipies")
mongo.then(() =>{
    console.log("MongoDb Connected")
}).catch((error) =>{
    console.error(error)
})

server.listen(5000, () => {
    console.log("Server running")
})