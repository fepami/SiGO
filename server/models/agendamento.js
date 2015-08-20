var db_age = require('../DAL/agendamento.js');
var db_vei = require('../DAL/veiculo.js');
var db_cli = require('../DAL/cliente.js')

module.exports = {
	getCriarAgendamento 	: getCriarAgendamento,
	doCriarAgendamento  	: doCriarAgendamento,
	doConsultarAgendamento  : doConsultarAgendamento,
	doCancelarAgendamento	: doCancelarAgendamento,
	doEditarAgendamento		: doEditarAgendamento,
	getEditarAgendamento	: getEditarAgendamento,
};

function getCriarAgendamento(req, res){

	// Usado pelo AJAX para retornar veiculos do cliente
	if ( req.query.nr != undefined){

		db_vei.veiculoByUsuario(req.query.nr, function(err, veiculos){

			if(err){

				req.session.error = 'Falha ao pesquisar Veiculos';
        		console.error(err);
			} else {

				res.json( { veiculos :  veiculos });
			}

			res.end();
		});
	}

	// Usado pelo AJAX para retornar os horarios ja agendados
	else if ( req.query.d != undefined){

		db_age.agendamentoByDia(req.query.d, function(err, horas){

			if(err){

				req.session.error = 'Falha ao pesquisar Agendamento';
	      		console.error(err);
			} else {

				res.json( { horas :  horas });

			}

			res.end();
		});

	}
	// Tela de criar agendamento inicial
	else{
		if(req.session.user.nivel_acesso < 3){
			db_cli.allCliente(function(err, clientes){
				if(err){
					req.session.error = 'Falha ao pesquisar clientes';
		        	console.error(err);
				} else {
					res.render('pages/criar_agendamento', { clientes: clientes });
				}
				res.end();
			});
		}else{
			db_cli.clienteByNomeUsuario(req.session.user.nome_usuario, function(err, cliente){
				if(err){
					req.session.error = 'Falha ao pesquisar cliente';
		        	console.error(err);
				} else {
					res.render('pages/criar_agendamento', { clientes: [cliente] });
				}
				res.end();
			});
		}
	}
}

function doConsultarAgendamento(req, res){
	if(req.session.user.nivel_acesso < 3){
		db_age.todosAgendamentosAtivos(function(err, agendamentos){
			if(err){
				req.session.error = 'Falha ao pesquisar agendamentos';
		       	console.error(err);
			} else {
				res.render('pages/consultar_agendamento', { agendamentos: agendamentos });
			}
			res.end();
		});
	}else{
		db_age.todosAgendamentosAtivosPorUsuario(req.session.user.nome_usuario, function(err, agendamentos){
			if(err){
				req.session.error = 'Falha ao pesquisar agendamentos';
		       	console.error(err);
			} else {
				res.render('pages/consultar_agendamento', { agendamentos: agendamentos });
			}
			res.end();
		});
	}
}

function doCriarAgendamento(req, res) {
	if(req.query.nr == undefined || req.query.d == undefined || req.query.h == undefined){
		req.session.error = 'Bad Request';
    	console.error(req.session.error);
    	res.end();
    	return;
	}

	var agendamento = {};
	agendamento.data = req.query.d;
	agendamento.hora = req.query.h;
	agendamento.renavam_veiculo = req.query.nr;

	db_age.criarAgendamento(agendamento, function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao inserir agendamento';
        	console.error(err);
        	res.send(false);
		}else{
			console.log('Agendamento ' + agendamento.id + " criado com sucesso!");
			res.json( { agendamentos :  agendamentos });
		}	
		res.end();
	});
}

function doCancelarAgendamento(req, res){
	db_age.cancelarAgendamento(req.query.id, function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao remover agendamento';
	       	console.error(err);
	       	res.send(false);
		} else {
			console.log('Agendamento ' + req.query.id + " cancelado com sucesso!");
			res.send(true);
		}
		res.end();
	});

}
function doEditarAgendamento(req, res) {
	if(req.query.id == undefined || req.query.d == undefined || req.query.h == undefined){
		req.session.error = 'Bad Request';
    	console.error(req.session.error);
    	res.end();
    	return;
	}
	var agendamento = {};

	agendamento.data 	= req.query.d;
	agendamento.hora 	= req.query.h;
	agendamento.id 		= req.query.id;

	db_age.editarAgendamento(agendamento, function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao editar agendamento';
        	console.error(err);
        	res.send(false);
		}else{
			console.log('Agendamento ' + agendamentos.id + " editado com sucesso!");
			res.send({ agendamentos : agendamentos });
		}
		res.end();
	});
}

function getEditarAgendamento(req, res) {

	if ( req.query.d != undefined){

		db_age.agendamentoByDia(req.query.d, function(err, horas){

			if(err){

				req.session.error = 'Falha ao pesquisar Agendamento';
	      		console.error(err);
			} else {
				res.json( { horas :  horas });
			}
			res.end();
		});

	}
	else if ( req.query.id == undefined){

		res.send("Erro");
	} else {
		res.render('pages/editar_agendamento', { idAgendamento: req.query.id });
	}

}