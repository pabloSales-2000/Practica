function usuarioLogueado(req, res, next){
    if(req.session.usuarioLogueado == undefined){
        next();
    }else{
        res.send('Ya estas registrado')
    }
}


module.exports = usuarioLogueado;