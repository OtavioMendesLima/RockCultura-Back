// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/cadastro', userController.createUser);

module.exports = router;
