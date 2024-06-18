const mongoose = require('mongoose');

const Order = new mongoose.Schema(
    {
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }, 
            quantity: {
                type: mongoose.Schema.Types.Number,
                ref: "Product"
            }
        },
    ],
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    status: String,
    totalPrice: Number,
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Order', Order);
