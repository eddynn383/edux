import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    image: {
        type: String,
        default: ""
    },
    roles: {
        type: String,
        enum: ["Learner", "Manager", "Admin"],
        default: ["Learner"]
    },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User