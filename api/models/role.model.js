import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    permissinos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Permissions" // Reference to another mongoose model if needed
    }
});

export default mongoose.model("Role", roleSchema);
