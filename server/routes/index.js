
var express       = require('express');
var router        = express.Router();
var login         = require('../models/login.js');
var agendamento   = require('../models/agendamento.js');
var cliente       = require('../models/cliente.js');
var os      	  = require('../models/ordemservico.js'); 
var cadastro      = require('../models/cadastro.js');
var serv_pecas    = require('../models/serv_pecas.js'); 


/**
*  R O T A S   P A R A   A S   T E L A S   D E   L O G I N  /  L O G O U T
*/

router.get('/', 		function(req, res)	{ res.render('pages/login') });
router.get('/login', 	function(req, res)	{ res.redirect('/'); });
router.post('/login', 	login.do_login);
router.get('/logout', 	login.do_logout);

/**
*  R O T A S   P A R A   A S   T E L A S   D E   C A D A S T R O
*/
router.get('/cadastro', function(req, res){
  res.render('pages/cadastro')
});
router.post('/cadastro', cadastro.do_cadastro);
router.get('/cadastro/verifica', cadastro.do_cadastro);


/**
*  R O T A S   P A R A   A S   T E L A S   D E   A G E N D A M E N T O
*/

router.get ('/agendamento/criar'		/*, login.restrict*/, agendamento.getCriarAgendamento);
router.get ('/agendamento/criar/criar'	/*, login.restrict*/, agendamento.doCriarAgendamento);
router.get ('/agendamento/remover'		/*, login.restrict*/, agendamento.doCancelarAgendamento);
router.get ('/agendamento/consultar'	/*, login.restrict*/, agendamento.doConsultarAgendamento);
router.get ('/agendamento/editar'		/*, login.restrict*/, agendamento.getEditarAgendamento);
router.get ('/agendamento/editar/editar'/*, login.restrict*/, agendamento.doEditarAgendamento);


/**
*  R O T A S   P A R A   A S   T E L A S   D E   O R D E M   D E   S E R V I C O
*/

router.get ('/os/consultar'		/*, login.restrict*/, os.doConsultarOs);
router.get ('/os/criar'			/*, login.restrict*/, os.doCriarOs);


/**
* R O T A S   P A R A   A S   T E L A S   D E   S E R V I Ç O S / P E Ç A S
*/
router.get('/serv_pecas', serv_pecas.getServicosPecas);
router.post('/servico', serv_pecas.servico);
router.post('/peca', serv_pecas.peca);

module.exports = router;