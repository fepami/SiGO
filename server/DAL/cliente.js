var db = require('./database.js');

module.exports = {
  allCliente            : allCliente,
  createCliente         : createCliente,
  alterCliente          : alterCliente,
  clienteByNomeUsuario  : clienteByNomeUsuario,
};

function createCliente(cliente, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO cliente(nome_usuario, nome, end_rua, end_complemento, ' +
      			'end_cidade, end_estado, telefone_1, telefone_2) ' +
      			'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
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

//Altera o Cliente:
//passar nome_usuario caso deseje alterar o campo nome_usuario
function alterCliente(cliente, nome_usuario, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);

    if(nome_usuario == undefined || nome_usuario == null)
      nome_usuario = cliente.nome_usuario;

    var query = client.query({
      text: 'UPDATE cliente SET nome_usuario = $9, nome = $2, end_rua = $3, ' +
        'end_complemento = $4, end_cidade = $5, end_estado = $6, telefone_1 = $7, ' +
        'telefone_2 = $8 WHERE nome_usuario = $1',
      values: [cliente.nome_usuario, cliente.nome, cliente.end_rua,
        cliente.end_complemento, cliente.end_cidade, cliente.end_estado,
        cliente.telefone_1, cliente.telefone_2, cliente.salario,
        cliente.cargo, nome_usuario],
      name: 'alter_cliente'
    });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
           done();
           console.log('cliente ' + cliente.nome_usuario + ' alterado com sucesso');
           cliente.nome_usuario = nome_usuario;
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

function clienteByNomeUsuario(nome_usuario, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = cliente.query({
      text: 'SELECT nome_usuario, nome, end_rua, end_complemento, ' +
        'end_cidade, end_estado, telefone_1, telefone_2' +
        'FROM cliente WHERE nome_usuario = $1',
      values: [nome_usuario],
      name: 'cliente_by_nome_usuario'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, cliente, done, callback);
    });
    query.on('end', function(result) {
      done();
      if(result.rowCount != 1)
        callback(new Error('cliente not found'));
      else
        callback(null, result.rows[0]);
    });
  });
}