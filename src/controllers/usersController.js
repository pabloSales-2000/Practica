const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');




const usersController = {
    home: (req, res) => {
        res.render('home')
    },

    registro: (req, res) => {
        res.render('registro')
    },

    guardarRegistro: (req, res) => {
        let errores = validationResult(req)

        if (errores.isEmpty()) {
            let usuario = {
                email: req.body.email,
                password: req.body.password
            }

            let usersRegisterPATH = path.resolve(__dirname, '../BD/usuariosRegistrados.json')

            let usuariosRegistrados = fs.readFileSync(usersRegisterPATH, { encoding: 'utf-8' });
            let usuariosNuevos;

            if (usuariosRegistrados == '') {
                usuariosNuevos = []
            } else {
                usuariosNuevos = JSON.parse(usuariosRegistrados)
            }

            usuariosNuevos.push(usuario)

            fs.writeFileSync(usersRegisterPATH, JSON.stringify(usuariosNuevos, null, 2))

            res.redirect('/')


        } else {
            res.render('registro', { errores: errores.array(), old: req.body })
        }
    },

    login: (req, res) => {
        res.render('login')
    },

    processLogin: (req, res) => {
        let errores = validationResult(req)

        if (errores.isEmpty()) {
            let usersRegisterPATH = path.resolve(__dirname, '../BD/usuariosRegistrados.json')

            let usuariosRegistrados = fs.readFileSync(usersRegisterPATH, { encoding: 'utf-8' });
            let usuariosNuevos;

            if (usuariosRegistrados == '') {
                usuariosNuevos = []
            } else {
                usuariosNuevos = JSON.parse(usuariosRegistrados)
            }

            let usuarioALoguearse;

            for (let i = 0; i < usuariosNuevos.length; i++) {
                if (usuariosNuevos[i].email == req.body.email) {
                    console.log('primer if');
                    if (req.body.password == usuariosNuevos[i].password) { //Porq no funciona con bcrypt.compareSync(req.body.password, usuariosNuevos[i].password)?
                        console.log('segundo if');
                        usuarioALoguearse = usuariosNuevos[i];
                        break;
                    }
                }
            }

            if (usuarioALoguearse == undefined) {
                res.render('login', {
                    errores: [
                        { msg: 'Credenciales invalidas' }
                    ]
                })
            } else {

                req.session.usuarioLogueado = usuarioALoguearse;

                if (req.body.recordame != undefined) { //si el usuario tildo el recordame esto viene con un valor, sino es undefined
                    res.cookie('recordame', usuarioALoguearse.email, { maxAge: 60000 }) //la cookie viaja por el response y le paso como parametros el nombre de la cookie (recordame) y el valor q sera el email. Luego un obj lit con el tiempo q quiero q dure la cookie q se da en milisegundos
                }

                res.redirect('/')
            }



        } else {
            res.render('login', { errores: errores.array(), old: req.body })
        }
    },

    check: (req, res) => {
        if (req.session.usuarioLogueado == undefined) {
            res.send('No estas logueado')
        } else {
            res.send(`El usuario logueado es ${req.session.usuarioLogueado.email}`)
        }
    }
}




module.exports = usersController;