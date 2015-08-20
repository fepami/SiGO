var db    = require('./database.js');

module.exports = {
  todosServicos:  todosServicos,
  todasPecas:     todasPecas,
  criarServico:   criarServico,
  criarPeca:      criarPeca,
  editarServico:  editarServico,
  editarPeca:     editarPeca,
  deleteServico:  deleteServico,
  deletePeca:     deletePeca,
};

function todosServicos(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'SELECT * FROM tipo_servico',
        values: [],
        name: 'todos_servicos'
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

function todasPecas(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'SELECT * FROM tipo_peca',
        values: [],
        name: 'todas_pecas'
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

function criarPeca(peca, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'INSERT INTO tipo_peca (nome, descricao, preco, quantidade) VALUES ($1, $2, $3, $4)',
        values: [peca.nome, peca.descricao, peca.preco, peca.quantidade],
        name: 'create_peca'
      });
      query.on('row', function(row, result) {
          result.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
         done();
         console.log('Peça ' + peca.nome + ' criada com sucesso');
         callback(null, peca);
      });
  });
}

function criarServico(servico, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'INSERT INTO tipo_servico (nome, descricao, especialidade, valor_mao_obra) VALUES ($1, $2, $3, $4)',
        values: [servico.nome, servico.descricao, servico.especialidade, servico.valor_mao_obra],
        name: 'create_servico'
      });
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('error', function(error) {
        db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Serviço ' + servico.nome + ' criado com sucesso');
        callback(null, servico);
      });
  });
}

function editarServico(servico, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'UPDATE tipo_servico SET nome=$1, descricao=$2, especialidade=$3, valor_mao_obra=$4 WHERE id=$5',
        values: [servico.nome, servico.descricao, servico.especialidade, servico.valor_mao_obra, servico.id],
        name: 'update_servico'
      });
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('error', function(error) {
        db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Serviço ' + servico.nome + ' editado com sucesso');
        callback(null, servico);
      });
  });
}

function editarPeca(peca, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'UPDATE tipo_peca SET nome=$1, descricao=$2, preco=$3, quantidade=$4 WHERE id=$5',
        values: [peca.nome, peca.descricao, peca.preco, peca.quantidade, peca.id],
        name: 'edit_peca'
      });
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('error', function(error) {
        db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Peça ' + peca.nome + ' editada com sucesso');
        callback(null, peca);
      });
  });
}

function deleteServico(id, callback) {
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'DELETE FROM tipo_servico WHERE id=$1',
        values: [id],
        name: 'delete_servico'
      });
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('error', function(error) {
        db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Servico deletado com sucesso');
        callback(null, id);
      });
  });
}

function deletePeca(id, callback) {
  console.log(id);
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'DELETE FROM tipo_peca WHERE id=$1',
        values: [id],
        name: 'delete_peca'
      });
      query.on('row', function(row, result) {
        result.addRow(row);
      });
      query.on('error', function(error) {
        console.log(error);
        db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(result) {
        done();
        console.log('Peça removida com sucesso');
        callback(null, id);
      });
  });
}
