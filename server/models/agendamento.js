var db_age = require('../DAL/agendamento.js');
var db_vei = require('../DAL/veiculo.js');
var db_cli = require('../DAL/cliente.js')

module.exports = {
	doAgendamento 			: doAgendamento,
	doCreateAgendamento 	: doCreateAgendamento,
	doCriarAgendamento  	: doCriarAgendamento,
	doConsultarAgendamento  : doConsultarAgendamento,
	doRemoverAgendamento	: doRemoverAgendamento,
};

function doAgendamento(req, res){

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

		db_cli.allCliente(function(err, clientes){

			if(err){
				req.session.error = 'Falha ao pesquisar clientes';
	        	console.error(err);
			} else {

			res.render('pages/criar_agendamento', { clientes: clientes });

			}

			res.end();
		});
	}
}

function doCriarAgendamento(req, res){

	// Usado pelo AJAX para retornar veiculos do cliente
	if ( req.query.nr != undefined &&
		 req.query.d  != undefined &&
		 req.query.h  != undefined ){

		db_age.criarAgendamento(req.query.nr, req.query.d, req.query.h, function(err, agendamento){

			if(err){

				req.session.error = 'Falha ao Criar Agendamento';
        		console.error(err);
			} else {
				console.log(agendamento);
				res.json( { agendamento :  agendamento });
			}

			res.end();
		});
	}

}

function doConsultarAgendamento(req, res){
	db_age.allAgendamento(function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao pesquisar agendamentos';
	       	console.error(err);
		} else {
			res.render('pages/consultar_agendamento', { agendamentos: agendamentos });
		}
		res.end();
	});

}

function doCreateAgendamento(req, res) {
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

	db_age.createAgendamento(agendamento, function(err, agendamento){
		if(err){
			req.session.error = 'Falha ao inserir agendamento';
        	console.error(err);
		}else{
			console.log('Agendamento ' + agendamento.id + " criado com sucesso!");
			res.json( { agendamento :  agendamento });
		}
		res.end();
	});
}

function doRemoverAgendamento(req, res){
	db_age.deleteAgendamento(req.query.id, function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao remover agendamento';
	       	console.error(err);
		} else {
			//doConsultarAgendamento(req, res);
		}
		res.end();
	});

}