const {body} = require('express-validator');

const validateRegister = [
    body('email')
        .notEmpty().withMessage('El campo de email esta vacio').bail()
        .isLength({min:10, max:30}).withMessage('El email debe contener entre 10 y 30 caracteres').bail(),
    body('password')
        .notEmpty().withMessage('Ingrese una contrasenia').bail()
        .isLength({min:4, max:15}).withMessage('La contrasenia debe tener entre 4 y 15 caracteres').bail()
]

module.exports = validateRegister;
