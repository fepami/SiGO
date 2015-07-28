var db = require('./database.js');

module.exports = {
  createVeiculo      : createVeiculo,
  veiculoByUsuario   : veiculoByUsuario,
};

function createVeiculo(veiculo, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO veiculo(renavan, palca, marca, modelo, ' +
      			'ano, nome_usuario) VALUES ($1, $2, $3, $4, $5, $6)',
      		values: [veiculo.renavan, veiculo.palca, veiculo.marca,
      			veiculo.modelo, veiculo.ano, veiculo.nome_usuario],
      		name: 'create_veiculo'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		db.checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('veiculo ' + veiculo.renavan + ' criado com sucesso');
      		 callback(null, veiculo);
    	});
	});
}

function veiculoByUsuario(nome, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'SELECT renavam, placa, marca, modelo, ano, nome_usuario ' +
      			'FROM veiculo WHERE nome_usuario = $1',
      		values: [nome],
      		name: 'veiculo_by_usuario'
    	});
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