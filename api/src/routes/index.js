const userRouter = require('./user');
const productRouter = require('./product');
const orderRouter = require('./order')

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/order', orderRouter);
}

module.exports = route;