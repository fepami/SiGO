
var express       = require('express');
var router        = express.Router();
var login         = require('../models/login.js');
var agendamento   = require('../models/agendamento.js');
var cliente       = require('../models/cliente.js');
var os      	    = require('../models/ordemservico.js'); 
var cadastro      = require('../models/cadastro.js');
var serv_pecas    = require('../models/serv_pecas.js');
var mecanicos     = require('../models/mecanicos.js');
var relatorios 	  = require('../models/relatorio.js')


/**
*  R O T A S   P A R A   A S   T E L A S   D E   L O G I N  /  L O G O U T
*/

router.get('/', function(req, res) { 
  var params = req.query;
  res.render('pages/login', { params: params } );
});
router.get('/login', 	function(req, res)	{ res.redirect('/'); });
router.post('/login', 	login.do_login);
router.get('/logout', 	login.do_logout);

/**
*  R O T A S   P A R A   A S   T E L A S   D E   C A D A S T R O
*/
router.get('/cadastro', function(req, res){
  res.render('pages/cadastro');
});
router.post('/cadastro', cadastro.do_cadastro);
router.get('/cadastro/verifica', cadastro.do_cadastro);
router.get('/cadastro/funcionario', function(req, res){
  res.render('pages/cadastro_func');
});
// Para cadastrar funcionário, deve-se aplciar a URL no navegador
router.post('/cadastro/funcionario', cadastro.do_funcionario_cadastro);

/**
*  R O T A S   P A R A   A S   T E L A S   D E   A G E N D A M E N T O
*/

router.get ('/agendamento/criar'		, login.restrict, agendamento.getCriarAgendamento);
router.get ('/agendamento/criar/criar'	, login.restrict, agendamento.doCriarAgendamento);
router.get ('/agendamento/remover'		, login.restrict, agendamento.doCancelarAgendamento);
router.get ('/agendamento/consultar'	, login.restrict, agendamento.doConsultarAgendamento);
router.get ('/agendamento/editar'		, login.restrict, agendamento.getEditarAgendamento);
router.get ('/agendamento/editar/editar', login.restrict, agendamento.doEditarAgendamento);


/**
*  R O T A S   P A R A   A S   T E L A S   D E   O R D E M   D E   S E R V I C O
*/

router.get ('/os/consultar'				, login.restrict, os.doConsultarOs);
router.get ('/os/criar'					, login.restrict, os.doCriarOs);
router.get ('/os/criar/servico' 		, login.restrict, os.doCriarServico);
router.get ('/os/autorizar'     /*, login.restrict*/, os.doAutorizaOs);
router.get ('/os/finalizar'     /*, login.restrict*/, os.doFinalizaOs);
router.get ('/os/suspender'     /*, login.restrict*/, os.doSuspendeOs);
router.get ('/os'     			/*, login.restrict*/, os.doConsultarOsById);


/**
* R O T A S   P A R A   A S   T E L A S   D E   S E R V I Ç O S / P E Ç A S
*/
router.get('/serv_pecas' 				, login.restrict, serv_pecas.getServicosPecas);
router.post('/servico' 					, login.restrict, serv_pecas.servico);
router.post('/peca'						, login.restrict, serv_pecas.peca);

/**
* R O T A S   P A R A   A S   T E L A S   D E   E Q U I P E S
*/
router.get('/equipes'					, login.restrict, mecanicos.getData);
router.get('/equipe'					, login.restrict, mecanicos.formarEquipe);
router.get('/equipe/delete'				, login.restrict, mecanicos.deletarEquipe);
router.get('/equipe/verifica'			, login.restrict, mecanicos.verificaEquipe);

/**
* R O T A S   P A R A   A S   T E L A S   D E   M E C Â N I C O S
*/
router.get('/mecanicos'					, login.restrict, mecanicos.getMecanicos);
router.get('/mecanico'					, login.restrict, mecanicos.getMecanico);
router.post('/mecanico/salvar'		, login.restrict, mecanicos.salvarMecanico);
router.get('/mecanico/delete'			, login.restrict, mecanicos.deletarMecanico);

/**
* R O T A S   P A R A   A S   T E L A S   D E   R E L A T O R I O S
*/
router.get('/relatorio'					, login.restrict, function(req, res){
	res.render('pages/relatorio');
});
router.get('/relatorio/gerar' 			, login.restrict, relatorios.doGetRelatorio);

/**
* R O T A S   P A R A   A S   T E L A S   D E   D A D O S  D E  C L I E N T E
*/
router.get('/cliente', login.restrict, cliente.getData);
router.post('/veiculo', login.restrict, cliente.addVeiculo);
router.get('/veiculo', login.restrict, cliente.deleteVeiculo);
router.get('/clientes', login.restrict, cliente.getAllClientesData)

module.exports = router;