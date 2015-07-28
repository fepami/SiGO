var db = require('./database.js');

module.exports = {
  createFuncionario  : createFuncionario,
  allFuncionario     : allFuncionario,
};

function createFuncionario(funcionario, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO funcionario(nome_usuario, nome, end_rua, end_complemento, ' +
      			'end_cidade, end_estado, telefone_1, telefone_2, salario, cargo) ' +
      			'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      		values: [funcionario.nome_usuario, funcionario.nome, funcionario.end_rua,
      			funcionario.end_complemento, funcionario.end_cidade, funcionario.end_estado,
      			funcionario.telefone_1, funcionario.telefone_2, funcionario.salario,
      			funcionario.cargo],
      		name: 'create_funcionario'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		db.checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('funcionario ' + funcionario.nome_usuario + ' criado com sucesso');
      		 callback(null, funcionario);
    	});
	});
}

function allFuncionario(callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
	    var query = funcionario.query({
      		text: 'SELECT nome_usuario, nome, end_rua, end_complemento, ' +
      			'end_cidade, end_estado, telefone_1, telefone_2, salario, cargo ' +
      			'FROM funcionario',
      		values: [],
      		name: 'all_funcionario'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		db.checkQueryError(error, funcionario, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 callback(null, result.rows);
    	});
	});
}