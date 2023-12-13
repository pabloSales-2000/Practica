const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.get('/', usersController.home)
router.get('/register', usersController.registro)

module.exports = router;