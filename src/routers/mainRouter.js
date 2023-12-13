/* VARIABLE DECLARATION */
const express = require('express');
const router = express.Router();

//REQUIRES ROUTERS

const rutasUsers = require('./usersRouter')

//ROUTER CONECTION
router.use('/', rutasUsers)


module.exports = router;