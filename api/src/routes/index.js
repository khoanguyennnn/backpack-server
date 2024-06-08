const userRouter = require('./user');
const productRouter = require('./product');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
}

module.exports = route;