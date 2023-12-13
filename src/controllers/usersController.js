const { validationResult } = require('express-validator');
const fs = require('fs');


const usersController = {
    home: (req,res) => {
        res.render('home')
    },

    registro: (req, res) => {
        res.render('registro')
    },

    guardarRegistro: (req, res) => {
        let errores = validationResult(req)

        if(errores.isEmpty) {
            let usuario = {
                email: req.body.email,
                password: req.body.password
            }

            let usuariosRegistrados = fs.readFileSync('usuariosRegistrados.json', {encoding: 'utf-8'});
            let usuariosNuevos;

            if(usuariosRegistrados == ''){
                usuariosNuevos = []
            }else{
                usuariosNuevos = JSON.parse(usuariosRegistrados)
            }

            usuariosNuevos.push(usuario)

            fs.writeFileSync('usuariosRegistrados.json', JSON.stringify(usuariosNuevos, null, 2) )

            res.redirect('/')


        }else{
            res.render('registro', {errors: errores.array(), old: req.body})
        }
    }
}




module.exports = usersController;