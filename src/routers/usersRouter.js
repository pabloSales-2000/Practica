const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateRegister = require('../../middlewares/validateRegister');


router.get('/', usersController.home);
router.get('/register', usersController.registro);
router.post('/register',validateRegister, usersController.guardarRegistro);
router.get('/login', usersController.login)
router.post('/login',validateRegister ,usersController.procesLogin)

module.exports = router;