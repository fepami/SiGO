var db    = require('./database.js');

module.exports = {
  todosServicos:  todosServicos,
  todasPecas:     todasPecas,
  criarServico:   criarServico,
  criarPeca:      criarPeca,
};

function todosServicos(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
        text: 'SELECT nome, descricao, especialidade, valor_mao_obra FROM tipo_servico',
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
        text: 'SELECT nome, descricao, preco, quantidade FROM tipo_peca',
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

function criarServico(servico, callback){
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