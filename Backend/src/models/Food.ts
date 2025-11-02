import mongoose, {Schema, Document} from "mongoose"

interface IFood extends Document{
    name:string
    category:string
    description:string
    image: string
}

const foodSchema = new Schema<IFood>({
    name: {type:String, required:true},
    category: {type:String, required:true},
    description:{type:String, required:true},
    image:{type:String, required:true}
},{timestamps:true})

export const Food = mongoose.model<IFood>("food", foodSchema)