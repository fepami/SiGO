
var express 		  = require('express');
var router  		  = express.Router();
var login 			  = require('../models/login.js');
var agendamento		= require('../models/agendamento.js');
var cliente       = require('../models/cliente.js');

/**
*	 R O T A S   P A R A   A S   T E L A S   D E   L O G I N 
*/
router.get('/', function(req, res) {
	res.render('pages/login')
});

/**
*	 R O T A S   P A R A   A S   T E L A S   D E   A G E N D A M E N T O
*/
router.get ('/agendamento'/*, login.restrict*/, agendamento.doAgendamento);
router.get ('/agendamento/criar'/*, login.restrict*/, agendamento.doCriarAgendamento);


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