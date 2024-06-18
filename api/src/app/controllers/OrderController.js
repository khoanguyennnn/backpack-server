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

        async getAllOrder(req, res, next){
            try {
                const token = await req.user;
                const user = await User.findOne({ email: token.email });

                const products = await Product.find({deleted: false})

                const order = await Order.find({ user: user._id})

                let test = order.map((values) => {
                    let newtest = values.products.map((value) => {
                        const id = value.product;
                        const data = products.filter(product => product._id == id.toString())
                        return {
                            product: data[0],
                        }
                    })

                    return {
                        _id: values._id,
                        products: newtest,
                        user: user._id,
                        status: "Shipping",
                        totalPrice: values.totalPrice,
                        createdAt: values.createdAt
                    };
                })

                // let listProduct = order[0].products.map((value) => {
                //     const id = value.product;
                //     const data = products.filter(product => product._id == id.toString())
                //     return {
                //         product: data[0],
                //         quantity: value.quantity
                //     }
                // })

                // var totalPrice = listProduct.reduce((partialSum, a) => partialSum + a.quantity*a.product.price, 0)

                return res.json(test)

            } catch (error) {
                return res.status(400).send("error occured!");
            }
        }
}

module.exports = new OrderController();
