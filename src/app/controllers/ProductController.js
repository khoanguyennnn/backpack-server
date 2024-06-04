const Product = require('../models/Product');
const User = require('../models/User')
const Cart = require('../models/Cart')

class ProductController {
    // [GET] /product/getProduct
    getProduct(req, res, next) {
        Product.find()
            .then(products => res.json(products))
            .catch(next)
    }

    // [POST] /product/storeProduct
    storeProduct(req, res, next) {
        let data = new Product(req.body)
        data.save()
            .catch((err) => {
                return res.status(400).json("error occured");
            })
            .then(() => {
                return res.status(200).json("data is saved")
            });
    }

    // [PUT] /product/editProduct
    update(req, res, next){
        Product.updateOne({ _id: req.body._id }, req.body)
            .then(() => res.status(200).json("updated successfully!"))
            .catch((err) => res.status(400).json("error occured"))
    }

    // [DELETE] /product/delete
    destroy(req, res, next) {
        Product.delete({ _id: req.body._id })
            .then(() => res.status(200).json("delete successfully!"))
            .catch((err) => res.status(400).json("error occured"));
    }

    // [DELETE] /product/forceDestroy
    forceDestroy(req, res, next) {
        Product.deleteOne({ _id: req.body._id })
            .then(() => res.status(200).json("Force Delete successfully!"))
            .catch((err) => res.status(400).json("error occured"));
    }

    // [PATCH] /product/restore
    restore(req, res, next) {
        Product.restore({ _id: req.body._id })
            .then(() => res.status(200).json("restore successfully!"))
            .catch((err) => res.status(400).json("error occured"));
    }

    // [POST] /product/addToCart
    async addToCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });

            let data = new Cart({
                product: req.body._id,
                user: user[0]["_id"]
            })

            data.save()
                .catch((err) => {
                    return res.status(400).json("error occured");
                })
                .then(() => {
                    return res.status(200).json("add to cart successfully")
                });
        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }

    // [GET] /product/getCart
    async getProduct(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });

            const cart = await Cart.find({user: user[0]["_id"]})

            let data = []

            for(let i = 0; i < cart.length; i++){
                data.push(await Product.findOne({_id: cart[i]["product"]}))
            }
            return res.status(200).send(data);
        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }

    // [DELETE] /product/removeAllCart
    async removeAllCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });

            await Cart.deleteMany({user: user[0]["_id"]})

            return res.status(200).send("remove from cart successfully");
        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }

    // [DELETE] /product/removeCart
    async removeCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });

            await Cart.deleteOne({
                user: user[0]["_id"],
                product: req.body._id
            })

            return res.status(200).send("product removed from cart");
        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }
}

module.exports = new ProductController();
