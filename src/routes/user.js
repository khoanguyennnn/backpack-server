const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/getUser', userController.getUser);
router.post('/register', userController.register);

module.exports = router;