var db = require('./database.js');

module.exports = {
	doAgendamento 		: doAgendamento,
	doCreateAgendamento : doCreateAgendamento,
	doCriarAgendamento  : doCriarAgendamento,
};

function doAgendamento(req, res){
	
	// Usado pelo AJAX para retornar veiculos do cliente
	if ( req.query.nr != undefined){ 

		db.veiculoByUsuario(req.query.nr, function(err, veiculos){
			
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

		db.agendamentoByDia(req.query.d, function(err, horas){
			
			if(err){
				
				req.session.error = 'Falha ao pesquisar Agendamento';
	      		console.error(err);
			} else {
				
				res.json( { horas :  horas });
			}			res.end();		
		});
		 
	}
	// Tela de criar agendamento inicial
	else{
		
		db.allCliente(function(err, clientes){
		
			if(err){
				req.session.error = 'Falha ao pesquisar clientes';
	        	console.error(err);
			} else {
				
				res.render('pages/agendamento', { clientes: clientes });
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

		db.criarAgendamento(req.query.nr, req.query.d, req.query.h, function(err, agendamento){
			
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


function doCreateAgendamento(req, res) {
	if(!req.body.data || !req.body.hora || !req.body.renavan_veiculo){
		req.session.error = 'Bad Request';
    	console.error(req.session.error);
    	res.end();
    	return;
	}
	var agendamento = {};
	agendamento.data = req.body.data;
	agendamento.hora = req.body.hora;
	agendamento.renavan_veiculo = req.body.renavan_veiculo;
	if(req.session.user.nivel_acesso != 0)
		agendamento.funcionario = req.session.user.nome_usuario;
	db.createAgendamento(agendamento, function(err, agendamento){
		if(err){
			req.session.error = 'Falha ao inserir agendamento';
        	console.error(err);
		}else{
			console.log('Agendamento ' + agendamento.id + " criado com sucesso!");
			var agendamentos = [];
			for (var i = 0; i < 10; i++) {
				agendamentos.push(agendamento);
			};
			res.render('pages/agendamento', { agendamentos: agendamentos });
		}
		res.end();
	});
}

