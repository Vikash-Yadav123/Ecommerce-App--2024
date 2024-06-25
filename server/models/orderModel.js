import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
    product: [
        {
            type: mongoose.ObjectId,
            ref: 'products',
        }
    ],
    payment: {


    },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: "Shipping",
        enum: ["Shipping", "Cancellation", "Process", "Packaging", "Deliver"],
        require: true,
    }

}, { timestamps: true });

export default mongoose.model('orders', orderShema);
