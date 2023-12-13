const fs = require('fs');


const usersController = {
    home: (req,res) => {
        res.render('home')
    },

    registro: (req, res) => {
        res.send('Hola que tal?')
    }
}



module.exports = usersController;