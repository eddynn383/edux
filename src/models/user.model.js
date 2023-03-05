import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ["Learner", "Manager", "Admin"],
        default: ['Learner']
    },
}, { timestamps: true })

export default mongoose.model("User", UserSchema)