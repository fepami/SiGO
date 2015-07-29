var db = require('./database.js');

module.exports = {
  createUsuario      : createUsuario,
  findUserByName     : findUserByName,
};

function findUserByName(name, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
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
      		db.checkQueryError(error, client, done, callback);
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
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
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
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
           done();
           console.log('Usuario criado com sucesso');
           callback(null, user);
      });
  });
}