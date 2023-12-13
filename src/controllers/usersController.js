const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');


const usersController = {
    home: (req,res) => {
        res.render('home')
    },

    registro: (req, res) => {
        res.render('registro')
    },

    guardarRegistro: (req, res) => {
        let errores = validationResult(req)

        if(errores.isEmpty()) {
            let usuario = {
                email: req.body.email,
                password: req.body.password
            }

            let usersRegisterPATH = path.resolve(__dirname, '../BD/usuariosRegistrados.json')

            let usuariosRegistrados = fs.readFileSync(usersRegisterPATH, {encoding: 'utf-8'});
            let usuariosNuevos;

            if(usuariosRegistrados == ''){
                usuariosNuevos = []
            }else{
                usuariosNuevos = JSON.parse(usuariosRegistrados)
            }

            usuariosNuevos.push(usuario)

            fs.writeFileSync(usersRegisterPATH, JSON.stringify(usuariosNuevos, null, 2) )

            res.redirect('/')


        }else{
            res.render('registro', {errores: errores.array(), old: req.body})
        }
    },

    login: (req, res) => {
        res.render('login')
    },

    procesLogin: (req, res) => {
        let errores = validationResult(req)

        if(errores.isEmpty()) {

        }else{
            res.render('login', {errores: errores.array(), old: req.body})
        }
    }
}




module.exports = usersController;