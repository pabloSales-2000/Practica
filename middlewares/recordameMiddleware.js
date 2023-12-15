const path = require('path');
const fs = require('fs')

//RECORDAR! -> Cuando creo una cookie lo hago con el response y .cookie y cuando quiero leerla en otro pedido
//lo hago con el request y .cookies (con la s al final, en plural)

function recordameMiddleware(req, res, next) {
    

    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usersRegisterPATH = path.resolve(__dirname, '../src/BD/usuariosRegistrados.json')

        let usuariosRegistrados = fs.readFileSync(usersRegisterPATH, { encoding: 'utf-8' });
        let usuariosNuevos;

        if (usuariosRegistrados == '') {
            usuariosNuevos = []
        } else {
            usuariosNuevos = JSON.parse(usuariosRegistrados)
        }

        let usuarioALoguearse;

        for (let i = 0; i < usuariosNuevos.length; i++) {
            if (usuariosNuevos[i].email == req.cookies.recordame) {  // pregunto si el mail del usuario q estoy iterando es igual al que tengo en la cookie
                
                usuarioALoguearse = usuariosNuevos[i]; //ya tengo el usuario q quiero loguear al final del for y lo obtuve de la cookie
                break;                                 // en funcion del mail q tenia almacenado
            }
        }
        req.session.usuarioLogueado = usuarioALoguearse;  //entonces lo pongo en session

        //este es un middleware que mira que hay en la cookie si hay algo en la cookie busca quien es y lo pone en session

    }

    next();
}

module.exports = recordameMiddleware;