const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateRegister = require('../../middlewares/validateRegister');
const usuarioLogueado = require('../../middlewares/usuarioLogueado');

router.get('/', usersController.home);
router.get('/register',usuarioLogueado, usersController.registro);
router.post('/register',validateRegister, usersController.guardarRegistro);
router.get('/login', usersController.login)
router.post('/login',validateRegister ,usersController.processLogin)
router.get('/check', usersController.check)

module.exports = router;