import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    slug: {
        type: String,
        require: true,
    }
}, { timestamps: true });

export default mongoose.model('categorys', categorySchema);