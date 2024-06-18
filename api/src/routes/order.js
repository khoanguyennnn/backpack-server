const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const authService = require('../services/authenticateServices');

router.get('/getAllOrder', authService.authenticateToken, orderController.getAllOrder);
router.post('/placeOrder', authService.authenticateToken, orderController.placeOrder);

module.exports = router;