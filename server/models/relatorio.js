var db_rel = require('../DAL/relatorio.js');

module.exports = {
	doGetRelatorio : doGetRelatorio
};

function doGetRelatorio(req, res){
	if(req.query.optradio == undefined || req.query.start == undefined || req.query.end == undefined){
		req.session.error = 'Bad Request';
    	console.error(req.session.error);
    	res.end();
    	return;
	}
	var relatorio = {};

	relatorio.type 		= req.query.optradio;
	relatorio.start 	= req.query.start;
	relatorio.end 		= req.query.end;

	db_rel.getRelatorios(relatorio, function(err, relatorios){
		if(err){
			req.session.error = 'Falha ao gerar relatorio';
        	console.error(err);
        	res.send(false);
		}else{
			console.log('Relatorio gerado com sucesso!');
			res.send({ relatorios : relatorios });
		}
		res.end();
	});
}