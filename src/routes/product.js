const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/getProduct', productController.getProduct);
router.post('/storeProduct', productController.storeProduct);
router.put('/editProduct', productController.update);
router.delete('/delete', productController.destroy);
router.delete('/forceDestroy', productController.forceDestroy);
router.patch('/restore', productController.restore);

module.exports = router;