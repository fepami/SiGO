
var express 		  = require('express');
var router  		  = express.Router();
var login 			  = require('../models/login.js');
var agendamento		= require('../models/agendamento.js');
var cliente       = require('../models/cliente.js');

router.get('/', function(req, res) {
	res.render('pages/login')
});

/**
*  R O T A S   P A R A   A S   T E L A S   D E   L O G I N  /  L O G O U T
*/
router.get ('/agendamento'/*, login.restrict*/, agendamento.doAgendamento);
router.get ('/agendamento/criar'/*, login.restrict*/, agendamento.doCriarAgendamento);
router.get('/login', function(req, res){
  res.redirect('/');
});

router.post('/login', login.do_login);
router.get('/logout', login.do_logout);
/**
*	 R O T A S   P A R A   A S   T E L A S   D E   A G E N D A M E N T O
*/
router.get('/agendamento'       /*,login.restrict*/, agendamento.doAgendamento); 
router.get('/agendamento/criar' ,login.restrict, agendamento.doCreateAgendamento);



module.exports = router;