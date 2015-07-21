var db = require('./database.js');

module.exports = {
	doAgendamento 		: doAgendamento,
	doCreateAgendamento : doCreateAgendamento,
};

function doAgendamento(req, res){
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
	// if(req.session.user.nivel_acesso != 0)
	// 	agendamento.funcionario = req.session.user.nome_usuario;
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

