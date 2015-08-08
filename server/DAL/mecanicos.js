var db = require('./database.js');

module.exports = {
  todasEquipes: todasEquipes
};

function todasEquipes(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'SELECT * FROM equipe_mecanico',
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