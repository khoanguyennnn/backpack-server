const Product = require('../models/Product');
const User = require('../models/User')
const Cart = require('../models/Cart')

class ProductController {
    // [GET] /product/getProduct
    async getProduct(req, res, next) {
        let productQuery = Product.find({deleted: false})

        if(req.query.hasOwnProperty('_sort')){
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        await productQuery.then(products => res.json(products))
                .catch(next)
    }

    // [GET] /product/getOneProduct
    async getOneProduct(req, res, next) {
        await Product.findOne({slug: req.params.slug})
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
                    return res.status(200).json({message: "data is saved", data})
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
            let data = req.body
            await Product.updateOne({ _id: req.body._id }, data)
                .then(() => res.status(200).json({message: "Data is updated successfully", data}))
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

    // [GET] /product/search
    async search(req, res, next){
        await Product.find({
            deleted: false,
            "$or": [
                {title:{$regex:req.query.q}}
            ]
        })
            .then(products => res.json(products))
            .catch(next)
    }

    // [POST] /product/addToCart
    async addToCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.findOne({ email: token.email });

            const product = await Cart.findOne({ product: req.body._id, user: user._id});

            let quantity = 1
            if( !product ) {
                let data = new Cart({
                product: req.body._id,
                user: user._id,
                quantity: quantity,
                })
                data.save()
                return res.status(200).json({message: "Add to Cart successfully"})
            } else {
                quantity = product.quantity + 1;
                await Cart.updateOne({ product: req.body._id, user: user._id }, {quantity : quantity })
                return res.status(200).json({message: "Add to Cart successfully"})
            }

        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }

    // [GET] /product/getCart
    async getCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.findOne({ email: token.email });
            const products = await Product.find({deleted: false})

            const cart = await Cart.find({user: user._id})
            
            const newCart = cart.map(value => {
                const id = value.product;
                const data = products.filter(product => product._id == id.toString())

                return {
                    product: data[0],
                    quantity: value.quantity
                }
            })
            
            return res.status(200).send(newCart);
        } catch (err) {
            return res.status(400).send("something gone wrong at getting products");
        }
    }

    // [PATCH] /product/subtractCart
    async subtractCart(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.findOne({ email: token.email });

            const product = await Cart.findOne({ product: req.body._id, user: user._id});
            if (product.quantity <= 1) {
                await Cart.deleteOne({
                    user: product.user,
                    product: product.product,
                    quantity: product.quantity
                })
                    .then(() => res.status(200).json({message: "Delete product from cart successfully"}))
                    .catch((err) => res.status(400).json({message: err}))
            } else if (product.quantity > 1){
                await Cart.updateOne({ product: product.product, user: product.user}, { quantity: product.quantity - 1 })
                    .then(() => res.status(200).json({message: "Subtract product from cart successfully"}))
                    .catch((err) => res.status(400).json({message: err}))
            }
        } catch (error) {
            return res.status(400).send("something gone wrong at subtract quantity");
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
