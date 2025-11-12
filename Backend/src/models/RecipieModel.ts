import mongoose, { Schema,Document, Date } from "mongoose";


interface IRecipie extends Document{
    userId: mongoose.Types.ObjectId
    foodId: mongoose.Types.ObjectId
    title:string
    ingredients: string[]
    step: string
    date: Date
    images: string[]
}

const recipieSchema = new Schema<IRecipie>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "UserId is required"]
    },
    foodId:{
        type: Schema.Types.ObjectId,
        ref: "foods",
        required: [true, "FoodId is required"]
    },
    title:{
        type:String, 
            required:[true, "Title is Required"],
            minlength:[1,"Title must be at least 1 characters"]
    },
    ingredients:[{
        type:String, 
            required:[true, "Ingredients is Required"],
            minlength:[1,"Ingredients must be at least 1 characters"]
    }],
    step:{
        type:String, 
            required:[true, "Step is Required"],
            minlength:[1,"Step must be at least 1 characters"]
    },
    date:{
            type:Date, 
            required:[true, "date is Required"],
           
    },
    images:[{
                type:String, 
                required:false
    }]
   
},{timestamps:true})

export const Recipie = mongoose.model<IRecipie>("recipie", recipieSchema)