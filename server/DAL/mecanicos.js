var db = require('./database.js');

module.exports = {
  todasEquipes: todasEquipes,
  todosMecanicos: todosMecanicos,
  createEquipe: createEquipe,
  getEquipeByIds: getEquipeByIds,
  deleteEquipe: deleteEquipe,
};

function todasEquipes(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT em.id_equipe, m1.nome as Nome1, m2.nome as Nome2 FROM equipe_mecanico em join mecanico m1 on em.codigo_mecanico_1 = m1.codigo_mecanico join mecanico m2 on em.codigo_mecanico_2 = m2.codigo_mecanico',
      values: [],
      name: 'todas_equipes'
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
      db.checkQueryError(error, client, done, callback);
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
        values: [equipe.m1, equipe.m2],
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

function getEquipeByIds(ids, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT id_equipe FROM equipe_mecanico WHERE codigo_mecanico_1=$1 and codigo_mecanico_2=$2',
      values: [ids.m1, ids.m2],
      name: 'get_equipe_by_ids'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, client, done, callback);
    });
    query.on('end', function(result) {
      done();
      callback(null, result.rows[0]);
    });
  });
}

function deleteEquipe(id, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'DELETE FROM equipe_mecanico WHERE id_equipe=$1',
      values: [id],
      name: 'delete_equipe'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, client, done, callback);
    });
    query.on('end', function(result) {
      done();
      console.log('Equipe ' + id + ' deletada com sucesso');
      callback(null, id);
    });
  });
}