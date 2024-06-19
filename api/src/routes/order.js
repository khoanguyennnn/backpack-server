const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const authService = require('../services/authenticateServices');

router.get('/getAllOrder', authService.authenticateToken, orderController.getAllOrder);
router.get('/getLogOrder', authService.authenticateToken, orderController.getLogOrder);
router.post('/placeOrder', authService.authenticateToken, orderController.placeOrder);
router.put('/editStatus', authService.authenticateToken, orderController.editStatus);

module.exports = router;