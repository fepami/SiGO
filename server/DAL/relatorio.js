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
  		text: "SELECT COUNT(CASE WHEN status=0 THEN 1 ELSE null END) as aguardando, "
  		+ "COUNT(CASE WHEN status=1 THEN 1 ELSE null END) as aprovada, " 
      + "COUNT(CASE WHEN status=2 THEN 1 ELSE null END) as finalizada, " 
      + "COUNT(CASE WHEN status=3 THEN 1 ELSE null END) as suspensa " 
  		+ "FROM os WHERE data_emissao >= to_date($1, 'dd/mm/YYYY') " 
  		+ "AND data_emissao <= to_date($2, 'dd/mm/YYYY')",
  		values: [relatorio.start, relatorio.end],
  		name: 'rel_os'
	};
}

function getQueryOS_suspensa(relatorio){
  return {
      text: "SELECT COUNT(CASE WHEN motivo_suspensao=1 THEN 1 ELSE null END) as valor, "
      + "COUNT(CASE WHEN motivo_suspensao=2 THEN 1 ELSE null END) as prazo " 
      + "FROM os WHERE data_emissao >= to_date($1, 'dd/mm/YYYY') " 
      + "AND data_emissao <= to_date($2, 'dd/mm/YYYY') AND status = 3",
      values: [relatorio.start, relatorio.end],
      name: 'rel_os_suspensa'
  };
}

function getQuery(relatorio){
	if(relatorio.type == "agendamento")
		return getQueryAgendamento(relatorio);
	else if(relatorio.type == "os")
		return getQueryOS(relatorio);
  else if(relatorio.type == "os-suspensa")
    return getQueryOS_suspensa(relatorio);
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