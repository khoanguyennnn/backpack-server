const Product = require('../models/Product');
const User = require('../models/User')
const Cart = require('../models/Cart')
const Order = require('../models/Order');

class OrderController {
      // [POST] /order/placeOrder
      async placeOrder(req, res, next){
            try {
                const token = await req.user;
                const user = await User.findOne({ email: token.email });

                const cart = await Cart.find({ user: user._id })
                const products = await Product.find({deleted: false})

                let listProduct = cart.map((value) => {
                    const id = value.product;
                    const data = products.filter(product => product._id == id.toString())
                    return {
                        product: data[0],
                        quantity: value.quantity
                    }
                })

                var totalPrice = listProduct.reduce((partialSum, a) => partialSum + a.quantity*a.product.price, 0)

                let data = new Order({
                    products: cart.map((value) => {         
                        return {
                            product: value.product,
                            quantity: value.quantity,
                        }
                    }),
                    user: user._id,
                    status: "Shipping",
                    totalPrice: totalPrice
                })

                data.save()
                    .catch((err) => {
                        return res.status(400).json("error occured");
                    })
                    .then(() => {
                        return res.status(200).json({message: "Place order successfully", data})
                    });
            } catch (error) {
                return res.status(400).send("error occured!");
            }
        }

        // [GET] /order/getAllOrder
        async getAllOrder(req, res, next){
            try {
                const token = await req.user;
                const user = await User.findOne({ email: token.email });

                const products = await Product.find({deleted: false})

                const order = await Order.find({ user: user._id})

                let data = order.map((values) => {
                    let product = values.products.map((value) => {
                        const id = value.product;
                        const data = products.filter(product => product._id == id.toString())
                        return {
                            product: data[0],
                            quantity: value.quantity
                        }
                    })

                    return {
                        _id: values._id,
                        products: product,
                        user: user._id,
                        status: values.status,
                        totalPrice: values.totalPrice,
                        createdAt: values.createdAt,
                    };
                })

                return res.json(data)

            } catch (error) {
                return res.status(400).send("error occured!");
            }
        }

        // [GET] /order/getLogOrder
        async getLogOrder(req, res, next){
            try {
                const token = await req.user;
                const user = await User.findOne({ email: token.email });
                if(user.role !== "admin") return res.status(403).json("you don't have permission!")

                const products = await Product.find({deleted: false})

                const order = await Order.find({})

                const listUser = await User.find({})

                let data = order.map((values) => {
                    let product = values.products.map((value) => {
                        const id = value.product;
                        const data = products.filter(product => product._id == id.toString())
                        return {
                            product: data[0],
                            quantity: value.quantity
                        }
                    })
                    
                    let orderUser = listUser.filter(user => user._id == values.user.toString())[0]
                    return {
                        _id: values._id,
                        products: product,
                        user: orderUser,
                        status: values.status,
                        totalPrice: values.totalPrice,
                        createdAt: values.createdAt,
                        updatedAt: values.updatedAt,
                    };
                })

                return res.json(data)

            } catch (error) {
                return res.status(400).send("error occured!");
            }
        }

        // [PUT] /order/editStatus
        async editStatus(req, res, next){
            try {
                const token = await req.user;
                const user = await User.findOne({ email: token.email });
                if(user.role !== "admin") return res.status(403).json("you don't have permission!")

                await Order.updateOne({ _id: req.body._id }, {status: "Delivery Successful"})
                    .then(() => res.status(200).json({message: "Data is updated successfully"}))
                    .catch((err) => res.status(400).json("error occured"))  

            } catch (error) {
                return res.status(400).send("error occured!");
            }
        }
}

module.exports = new OrderController();
