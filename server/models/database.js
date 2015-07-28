var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://tvlqxxjctmdinm:z2rBw-iPhbMbzira6MOliQuEOk@ec2-107-20-222-114.compute-1.amazonaws.com:5432/dekl0ddiqrurco:5432';

module.exports = {
  end                : end,
	createAgendamento  : createAgendamento,
	createUsuario      : createUsuario,
	findUserByName     : findUserByName,
	allAgendamento     : allAgendamento,
  allCliente         : allCliente,
  createFuncionario  : createFuncionario,
  allFuncionario     : allFuncionario,
  createVeiculo      : createVeiculo,
  veiculoByUsuario   : veiculoByUsuario,
  agendamentoByDia   : agendamentoByDia,
};

function end(){
	pg.end();
}

function checkConnectionError(error, callback){
	if (error){
		// console.error('A connection error has happened. Error: ' + error);
		callback(error);
	}
}

function checkQueryError(error, client, done, callback){
	if(error){
		done(client);
		callback(error);
	}
}

function createAgendamento(agendamento, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO agendamento(data, hora, renavan_veiculo, funcionario) ' +
      			'VALUES ($1, $2, $3, $4) RETURNING id',
      		values: [agendamento.data, agendamento.hora,
      			agendamento.renavan_veiculo, agendamento.funcionario],
      		name: 'create_agendamento'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 agendamento.id = result.rows[0].id;
      		 callback(null, agendamento);
    	});
	});
}

function allAgendamento(callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'SELECT id, data, hora, renavan_veiculo, funcionario FROM agendamento',
      		values: [],
      		name: 'all_agendamento'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 callback(null, result.rows);
    	});
	});
}

function findUserByName(name, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'SELECT nome_usuario, salt, hash, nivel_acesso FROM usuario ' +
				'WHERE nome_usuario=$1',
      		values: [name],
      		name: 'findUserByName'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 if(result.rowCount != 1){
      		 	callback(new Error('user not found'));
      		 }else{
				var user = result.rows[0];
				callback(null, user);
      		 }
    	});
	});
}

function createUsuario(user, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
	    var query = client.query({
      		text: 'INSERT INTO usuario(nome_usuario, salt, hash, nivel_acesso) ' +
      			'VALUES ($1, $2, $3, $4)',
      		values: [user.nome_usuario, user.salt, user.hash, user.nivel_acesso],
      		name: 'create_usuario'
    	});
    	query.on('row', function(row, result) {
      		result.addRow(row);
    	});
    	query.on('error', function(error) {
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('Usuario criado com sucesso');
      		 callback(null, user);
    	});
	});
}

function createCliente(cliente, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
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
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('Cliente ' + cliente.nome_usuario + ' criado com sucesso');
      		 callback(null, cliente);
    	});
	});
}

function allCliente(callback){
  pg.connect(connectionString, function(err, client, done){
    checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT * FROM cliente',
          values: [],
          name: 'all_clients'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
           done();
           callback(null, result.rows);
      });
  });
}


function createFuncionario(funcionario, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
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
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('funcionario ' + funcionario.nome_usuario + ' criado com sucesso');
      		 callback(null, funcionario);
    	});
	});
}

function allFuncionario(callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
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
      		checkQueryError(error, funcionario, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 callback(null, result.rows);
    	});
	});
}

function createVeiculo(veiculo, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
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
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 console.log('veiculo ' + veiculo.renavan + ' criado com sucesso');
      		 callback(null, veiculo);
    	});
	});
}

function veiculoByUsuario(nome, callback){
	pg.connect(connectionString, function(err, client, done){
		checkConnectionError(err, callback);
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
      		checkQueryError(error, client, done, callback);
    	});
    	query.on('end', function(result) {
      		 done();
      		 callback(null, result.rows);
    	});
	});
}

function agendamentoByDia(dia, callback){
  pg.connect(connectionString, function(err, client, done){
    checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, renavam_veiculo, funcionario ' +
            'FROM agendamento WHERE data = $1',
          values: [dia],
          name: 'agendamento_by_dia'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
           done();
           console.log(dia);
           console.log(result);
           callback(null, result.rows);
      });
  });
}

