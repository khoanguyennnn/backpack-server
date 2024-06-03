const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Product = new mongoose.Schema(
    {
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
            rate: Number,
            count: Number
        },
    },
    {
        timestamps: true,
    },
)

Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

let product = new mongoose.model("Product", Product);
module.exports = product;