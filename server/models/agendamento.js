var db = require('./database.js');

module.exports = {
	doCreateAgendamento : doCreateAgendamento,
	doAllAgendamentos : doAllAgendamentos,
};

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

function doAllAgendamentos(req, res){
	db.allAgendamento(function(err, agendamentos){
		if(err){
			req.session.error = 'Falha ao pesquisar agenda';
        	console.error(err);
		}else{
			res.render('pages/agendamento', { agendamentos: agendamentos });
		}
		res.end();
	});
}