import mongoose from "mongoose";

const subNavigationSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    roles: {
        type: [String],
        required: true,
    }
});

const navigationSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    roles: {
        type: [String],
        required: true,
    },
    children: [subNavigationSchema],
});

const Navigation = mongoose.models.Navigation || mongoose.model("Navigation", navigationSchema)
export default Navigation