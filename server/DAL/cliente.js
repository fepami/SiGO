var db = require('./database.js');

module.exports = {
  allCliente         : allCliente,
  createCliente      : createCliente,
};

function createCliente(cliente, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO cliente(nome_usuario, nome, end_rua, end_complemento, ' +
      			'end_cidade, end_estado, telefone_1, telefone_2) ' +
      			'VALUES ($1, $2, $3, $4, $5, $6, $7)',
      		values: [cliente.nome_usuario, cliente.nome, cliente.end_rua,
      			cliente.end_complemento, cliente.end_cidade, cliente.end_estado,
      			cliente.telefone_1, cliente.telefone_2],
      		name: 'create_cliente'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		db.checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('Cliente ' + cliente.nome_usuario + ' criado com sucesso');
      		 callback(null, cliente);
    	});
	});
}

function allCliente(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT * FROM cliente',
          values: [],
          name: 'all_clients'
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