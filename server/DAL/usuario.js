var db = require('./database.js');

module.exports = {
  createUsuario      : createUsuario,
  findUserByName     : findUserByName,
  findUserByEmail    : findUserByEmail,
  alterUsuario       : alterUsuario,
};

function findUserByName(name, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT nome_usuario, email, salt, hash, nivel_acesso FROM usuario ' +
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

function findUserByEmail(email, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT nome_usuario, email, salt, hash, nivel_acesso FROM usuario ' +
        'WHERE email=$1',
      values: [email],
      name: 'findUserByEmail'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, client, done, callback);
    });
    query.on('end', function(result) {
      done();
      if(result.rowCount != 1)
        callback(new Error('user not found'));
      else
        callback(null, result.rows[0]);
    });
  });
}

function createUsuario(user, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'INSERT INTO usuario(nome_usuario, email, salt, hash, nivel_acesso) ' +
        'VALUES ($1, $2, $3, $4)',
      values: [user.nome_usuario, user.email, user.salt, user.hash, user.nivel_acesso],
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

function alterUsuario(user, nome_usuario, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);

     if(nome_usuario == undefined || nome_usuario == null)
      nome_usuario = funcionario.nome_usuario;

    var query = client.query({
      text: 'UPDATE usuario SET nome_usuario = $6, email = $2, salt = $3, ' +
        'hash = $4 , nivel_acesso = $5  WHERE nome_usuario = $1',
      values: [user.nome_usuario, user.email, user.salt, user.hash,
        user.nivel_acesso, nome_usuario],
      name: 'alter_usuario'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, client, done, callback);
    });
    query.on('end', function(result) {
      done();
      console.log('Usuario ' + user.nome_usuario + ' criado com sucesso');
      user.nome_usuario = nome_usuario;
      callback(null, user);
    });
  });
}