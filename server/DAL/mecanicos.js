var db = require('./database.js');

module.exports = {
  todasEquipes: todasEquipes,
  todosMecanicos: todosMecanicos,
  createEquipe: createEquipe,
  getEquipeByIds: getEquipeByIds,
  deleteEquipe: deleteEquipe,
  deleteMecanico : deleteMecanico,
  createMecanico : createMecanico, 
  updateMecanico : updateMecanico,
  mecanicoById : mecanicoById
};

function mecanicoById(cod, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: "SELECT * FROM mecanico WHERE codigo_mecanico = $1",
      values: [cod],
      name: 'mecanico_by_id'
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

function createMecanico(mecanico, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: "INSERT INTO mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, " +
          "end_estado, telefone_1, telefone_2, especialidade) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING codigo_mecanico",
        values: [mecanico.nome, mecanico.end_rua, mecanico.end_complemento, mecanico.end_cep, 
          mecanico.end_cidade, mecanico.end_estado, mecanico.telefone_1, mecanico.telefone_2, 
          mecanico.especialidade],
        name: 'create_mecanico'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Mecânico criada com sucesso');
        callback(null, result.rows[0].codigo_mecanico);
      });
  });
}

function updateMecanico(mecanico, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: "UPDATE mecanico SET nome = $1, end_rua = $2, end_complemento = $3, end_cep = $4, " +
        "end_cidade = $5, end_estado = $6, telefone_1 = $7, telefone_2 = $8, especialidade = $9" +
        "WHERE codigo_mecanico = $10",
        values: [mecanico.nome, mecanico.end_rua, mecanico.end_complemento, mecanico.end_cep, 
          mecanico.end_cidade, mecanico.end_estado, mecanico.telefone_1, mecanico.telefone_2, 
          mecanico.especialidade, mecanico.codigo_mecanico],
        name: 'update_mecanico'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Mecânico atualizado com sucesso');
        callback(null, mecanico);
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

function deleteMecanico(id, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'DELETE FROM mecanico WHERE codigo_mecanico=$1',
      values: [id],
      name: 'delete_mecanico'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
    });
    query.on('error', function(error) {
      db.checkQueryError(error, client, done, callback);
    });
    query.on('end', function(result) {
      done();
      console.log('Mecanico ' + id + ' deletado com sucesso');
      callback(null, id);
    });
  });
}