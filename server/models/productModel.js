import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    slug: {
        type: String,
        require: true,

    },
    quantity: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    shipping: {
        type: Boolean,
    },
    photo: {
        contentType: String,
        data: Buffer,

    },
    color: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'categorys', // Assuming the name of the referenced collection is 'categories'
    }

}, { timestamps: true });

export default mongoose.model('products', productSchema);