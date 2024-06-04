const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const authService = require('../services/authenticateServices');

router.get('/getAllUser', userController.getAllUser);
router.get('/getUser', authService.authenticateToken, userController.getUser)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/token', userController.refreshToken);
router.delete('/logout', userController.logout);

module.exports = router;