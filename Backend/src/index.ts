import express, { Application, Request, Response } from "express"



const app: Application = express()

app.use(express.json())
app.get("/",(req: Request, res: Response) =>{
    res.send("Hello TS Express")
}) 
 


app.listen(5000, () => {
    console.log("Server running")
})