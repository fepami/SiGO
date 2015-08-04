var db    = require('./database.js');

module.exports = {
  todosServicos:  todosServicos,
  todasPecas:     todasPecas,
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