import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    permissinos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Permissions"
    }
});

const Role = mongoose.model("Role", roleSchema);
export default Role;