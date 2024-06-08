const Product = require('../models/Product');
const User = require('../models/User')
const Cart = require('../models/Cart')

class ProductController {
    // [GET] /product/getProduct
    async getProduct(req, res, next) {
        await Product.find({deleted: false})
            .then(products => res.json(products))
            .catch(next)
    }

    // [POST] /product/storeProduct
    async storeProduct(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            if(user[0]["role"] !== "admin") return res.status(403).json("you don't have permission!")
            let data = new Product(req.body)
            data.save()
                .catch((err) => {
                    return res.status(400).json("error occured");
                })
                .then(() => {
                    return res.status(200).json("data is saved")
                });
        } catch (error) {
            return res.status(400).send("error occured!");
        }
    }

    // [PUT] /product/editProduct
    async update(req, res, next){
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            if(user[0]["role"] !== "admin") return res.status(403).json("you don't have permission!")
            Product.updateOne({ _id: req.body._id }, req.body)
                .then(() => res.status(200).json("updated successfully!"))
                .catch((err) => res.status(400).json("error occured"))  
        } catch (error) {
            return res.status(400).send("error occured!");
        }
    }

    // [DELETE] /product/delete
    async destroy(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            if(user[0]["role"] !== "admin") return res.status(403).json("you don't have permission!")
            Product.delete({ _id: req.body._id })
                .then(() => res.status(200).json("delete successfully!"))
                .catch((err) => res.status(400).json("error occured"));
        } catch (error) {
            return res.status(400).send("error occured!");
        }
    }

    // [DELETE] /product/forceDestroy
    async forceDestroy(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            if(user[0]["role"] !== "admin") return res.status(403).json("you don't have permission!")
            Product.deleteOne({ _id: req.body._id })
                .then(() => res.status(200).json("Force Delete successfully!"))
                .catch((err) => res.status(400).json("error occured"));
        } catch (error) {
            return res.status(400).send("error occured!");
        }
    }

    // [PATCH] /product/restore
    async restore(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            if(user[0]["role"] !== "admin") return res.status(403).json("you don't have permission!")
            Product.restore({ _id: req.body._id })
                .then(() => res.status(200).json("restore successfully!"))
                .catch((err) => res.status(400).json("error occured"));
        } catch (error) {
            return res.status(400).send("error occured!");
        }
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
    async getCart(req, res, next) {
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
            return res.status(400).send("something gone wrong at getting products");
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
            return res.status(400).send("something gone wrong at remove cart");
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
            return res.status(400).send("something gone wrong at remove cart");
        }
    }
}

module.exports = new ProductController();
