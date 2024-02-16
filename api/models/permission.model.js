import mongoose from "mongoose";


const permissinShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model("Permission", permissinShema);
