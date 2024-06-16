const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Product = new mongoose.Schema(
    {
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        slug: { type: String, slug: 'title' },
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