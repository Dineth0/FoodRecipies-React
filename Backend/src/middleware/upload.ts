
import multer from "multer"
// import { CloudinaryStorage } from "multer-storage-cloudinary"
// import cloudinary from "../config/cloudinary"


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file)=> {
//         return{
//             folder: "foods",
//             format: () => {
//       const ext = file.mimetype.split("/")[1];
//       return ext === "jpeg" ? "jpg" : ext;
//     },
//         }
//   },
// })
const storage = multer.memoryStorage()
const upload = multer({storage})

export default upload