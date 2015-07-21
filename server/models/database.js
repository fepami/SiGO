var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://tvlqxxjctmdinm:z2rBw-iPhbMbzira6MOliQuEOk@ec2-107-20-222-114.compute-1.amazonaws.com:5432/dekl0ddiqrurco:5432';

module.exports = {
  end                : end,
	createAgendamento  : createAgendamento,
	createUsuario      : createUsuario,
	findUserByName     : findUserByName,
	allAgendamento     : allAgendamento,
  allCliente         : allCliente,
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