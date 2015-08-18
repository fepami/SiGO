var db = require('./database.js');

module.exports = {
  todasEquipes: todasEquipes,
  todosMecanicos: todosMecanicos,
  getIdByNomes: getIdByNomes,
  createEquipe: createEquipe,
};

function todasEquipes(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT em.id, m1.nome as Nome1, m2.nome as Nome2 FROM equipe_mecanico em join mecanico m1 on em.codigo_mecanico_1 = m1.codigo_mecanico join mecanico m2 on em.codigo_mecanico_2 = m2.codigo_mecanico',
      values: [],
      name: 'todas_equipes'
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

function todosMecanicos(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT * FROM mecanico',
      values: [],
      name: 'todos_mecanicos'
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

function getIdByNomes(nomes, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT codigo_mecanico FROM mecanico WHERE nome = $1 or nome = $2',
      values: [nomes.m1, nomes.m2],
      name: 'id_mecanicos'
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

function createEquipe(equipe, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'INSERT INTO equipe_mecanico (codigo_mecanico_1, codigo_mecanico_2) VALUES ($1, $2)',
        values: [equipe.mecanico1, equipe.mecanico2],
        name: 'create_equipe'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
         done();
         console.log('Equipe criada com sucesso');
         callback(null, equipe);
      });
  });
}
