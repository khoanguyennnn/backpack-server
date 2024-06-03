const Product = require('../models/Product');

class UserController {
    // [GET] /product/getProduct
    getProduct(req, res, next) {
        Product.find()
            .then(users => res.json(users))
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
}

module.exports = new UserController();
