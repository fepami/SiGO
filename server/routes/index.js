var express 		 = require('express');
var router  		 = express.Router();
var login 			 = require('../models/login.js')
/**
*	Rota para a tela de login
*/
router.get('/', function(req, res) {
	res.render('pages/login')
});

/**
*	Rota para a tela de agendamento
*/
router.get('/agendamento', login.restrict, function(req, res) {
  	res.render('pages/agendamento');
});

/**
*	Comando Login
*/
router.get('/login', function(req, res){
	res.redirect('/');
});

router.post('/login', login.do_login);

/**
*	Comando Logout
*/
router.get('/logout', login.do_logout);

module.exports = router;