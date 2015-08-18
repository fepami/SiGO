var db = require('./database.js');

module.exports = {
	getRelatorios : getRelatorios
};

function getQueryAgendamento(relatorio){
	return {
  		text: "SELECT COUNT(CASE WHEN status=1 THEN 1 ELSE null END) as ativos, "
  		+ "COUNT(CASE WHEN status=0 THEN 1 ELSE null END) as cancelados " 
  		+ "FROM agendamento WHERE data >= to_date($1, 'dd/mm/YYYY') " 
  		+ "AND data <= to_date($2, 'dd/mm/YYYY')",
  		values: [relatorio.start, relatorio.end],
  		name: 'rel_agendamento'
	};
}

function getQueryOS(relatorio){
	return {
  		text: "SELECT COUNT(CASE WHEN status=1 THEN 1 ELSE null END) as ativos, "
  		+ "COUNT(CASE WHEN status=0 THEN 1 ELSE null END) as cancelados " 
  		+ "FROM os WHERE data_emissao >= to_date($1, 'dd/mm/YYYY') " 
  		+ "AND data_emissao <= to_date($2, 'dd/mm/YYYY')",
  		values: [relatorio.start, relatorio.end],
  		name: 'rel_os'
	};
}

function getQuery(relatorio){
	if(relatorio.type == "agendamento")
		return getQueryAgendamento(relatorio);
	else if(relatorio.type == "os")
		return getQueryOS(relatorio);
}

function getRelatorios(relatorio, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
		var query = client.query(getQuery(relatorio));
		query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		db.checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 callback(null, result.rows);
    	});
	});
}