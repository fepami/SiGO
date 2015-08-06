var db = require('./database.js');

function todasOS(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT numero_os, data_emissao, valor, data_conclusao, status, motivo_suspensao, total_pecas,'+
                'FROM os WHERE status = 1',
          values: [],
          name: 'todos_so_ativos'
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

module.exports = {
  todasOS : todasOS,

};