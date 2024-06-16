const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const authService = require('../services/authenticateServices');
const Upload = require('../app/middlewares/Upload');

router.get('/getCart', authService.authenticateToken, productController.getCart);
router.get('/getProduct', productController.getProduct);
router.get('/search', productController.search);
router.get('/:slug', productController.getOneProduct)
router.post('/storeProduct', authService.authenticateToken, Upload.single('image'), productController.storeProduct);
router.put('/editProduct',authService.authenticateToken,Upload.single('image'),  productController.update);
router.delete('/delete', authService.authenticateToken, productController.destroy);
router.delete('/forceDestroy', authService.authenticateToken, productController.forceDestroy);
router.patch('/restore', authService.authenticateToken, productController.restore);

router.post('/subtractCart', authService.authenticateToken, productController.subtractCart)
router.post('/addToCart', authService.authenticateToken, productController.addToCart);
router.delete('/removeAllCart', authService.authenticateToken, productController.removeAllCart);
router.delete('/removeCart', authService.authenticateToken, productController.removeCart);

module.exports = router;