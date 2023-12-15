//REQUIRES
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const router = require('./routers/mainRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const recordameMiddleware = require('../middlewares/recordameMiddleware');

//Puerto donde corre el servidor
const PORT = process.env.PORT || 3000;

//Ejecucion de express
const app = express();

//Ruta carpeta archivos publicos
const publicPath = path.resolve(__dirname, './public');

//Server LISTEN (levantar servidor)

app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${PORT} http://localhost:3000/`);
})

//EJS SETTING
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* PUBLIC SETTING */
app.use(express.static(publicPath));

// MIDDLEWARES DE APLICACION 
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false})); // para poder trabajar con los datos de un formulario 
app.use(express.json());
app.use(session({
    secret: 'Nuestro secreto',
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser());
app.use(recordameMiddleware);

/* ROUTER CONECTION */
app.use('/', router);


//ERROR 404
app.use((req, res, next)=>{
    res.status(404).render('not-found')
})