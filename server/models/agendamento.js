var db = require('./database.js');

module.exports = {
	doCreateAgendamento : doCreateAgendamento,
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
	agendamento.funcionario = req.body.funcionario;
	db.createAgendamento(agendamento, function(err, agendamento){
		if(err){
			req.session.error = 'Falha ao inserir agendamento';
        	console.error(err);
		}else{
			console.log(agendamento.id);
		}
		res.end();
	});
}