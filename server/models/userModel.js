import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    address: {
        type: {},
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    product: {
        type: mongoose.ObjectId,
        ref: 'products',
    },
}, { timestamps: true });

export default mongoose.model('users', userSchema);