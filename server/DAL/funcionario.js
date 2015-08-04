var db = require('./database.js');

module.exports = {
  createFuncionario         : createFuncionario,
  allFuncionario            : allFuncionario,
  alterFuncionario          : alterFuncionario,
  funcionarioByNomeUsuario  : funcionarioByNomeUsuario,
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

//Altera o funcionario:
//passar nome_usuario caso deseje alterar o campo nome_usuario
function alterFuncionario(funcionario, nome_usuario, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);

    if(nome_usuario == undefined || nome_usuario == null)
      nome_usuario = funcionario.nome_usuario;

    var query = client.query({
      text: 'UPDATE funcionario SET nome_usuario = $11, nome = $2, end_rua = $3, ' +
        'end_complemento = $4, end_cidade = $5, end_estado = $6, telefone_1 = $7, ' +
        'telefone_2 = $8, salario = $9, cargo = $10 WHERE nome_usuario = $1',
      values: [funcionario.nome_usuario, funcionario.nome, funcionario.end_rua,
        funcionario.end_complemento, funcionario.end_cidade, funcionario.end_estado,
        funcionario.telefone_1, funcionario.telefone_2, funcionario.salario,
        funcionario.cargo, nome_usuario],
      name: 'alter_funcionario'
    });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
           done();
           console.log('funcionario ' + funcionario.nome_usuario + ' alterado com sucesso');
           funcionario.nome_usuario = nome_usuario;
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

function funcionarioByNomeUsuario(nome_usuario, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = funcionario.query({
      text: 'SELECT nome_usuario, nome, end_rua, end_complemento, ' +
        'end_cidade, end_estado, telefone_1, telefone_2, salario, cargo ' +
        'FROM funcionario WHERE nome_usuario = $1',
      values: [nome_usuario],
      name: 'funcionario_by_nome_usuario'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, funcionario, done, callback);
    });
    query.on('end', function(result) {
      done();
      if(result.rowCount != 1)
        callback(new Error('funcionario not found'));
      else
        callback(null, result.rows[0]);
    });
  });
}