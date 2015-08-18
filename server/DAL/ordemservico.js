var db = require('./database.js');

function todasOS(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT * FROM os WHERE status = 1',
          values: [],
          name: 'todas_os_ativas'
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

function criarOS(os, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var queryEquipe = client.query({
          text: 'INSERT INTO equipe_mecanico (codigo_mecanico_1, codigo_mecanico_2)' +
                'VALUES ($1,$2) RETURNING id_equipe',
          values: [os.mecanico1, os.mecanico2],
          name: 'criar_equipe'
      });
      queryEquipe.on('row', function(row, resultEquipe) {
          resultEquipe.addRow(row);
      });
      queryEquipe.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      queryEquipe.on('end', function(resultEquipe) {
          
          var queryOS = client.query({
            text: 'INSERT INTO os (data_emissao,data_conclusao,status,id_equipe)' +
                  'VALUES ($1,$2,1,$3) RETURNING numero_os',
            values: [os.dataEmissao, os.dataConclusao, resultEquipe.rows[0].id_equipe],
            name: 'criar_os'
          });
          queryOS.on('row', function(row, resultOS) {
              resultOS.addRow(row);
          });
          queryOS.on('error', function(error) {
              db.checkQueryError(error, client, done, callback);
          });
          queryOS.on('end', function(resultOS) {
           done();
           
           callback(null, resultOS.rows);
      });
      });
  });
}



module.exports = {
  todasOS : todasOS,
  criarOS : criarOS,
};