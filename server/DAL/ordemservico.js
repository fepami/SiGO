var db = require('./database.js');

function todasOS(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT os.numero_os, os.data_emissao, os.data_conclusao, os.status, os.motivo_suspensao, os.id_equipe, veiculo.placa '+
                'FROM os '+
                'INNER JOIN agendamento '+
                'ON os.id_agendamento = agendamento.id '+
                'INNER JOIN veiculo '+
                'ON agendamento.renavam_veiculo = veiculo.renavam',
          values: [],
          name: 'todas_os'
      });
      query.on('row', function(row, result) {
          switch ( row.status ){
            case 0 :{
              row.status = "AGUARDANDO";
              break;
            }
            case 1 :{
              row.status = "APROVADA";
              break;
            }
            case 2 :{
              row.status = "FINALIZADA";
              break;
            }
            case 3 :{
              row.status = "SUSPENSA";
              break;
            }
          }
          switch ( row.motivo_suspensao ){
            case 0 :{
              row.motivo_suspensao = "VALOR";
              break;
            }
            case 1 :{
              row.motivo_suspensao = "PRAZO DE EXECUCAO";
              break;
            }
          }
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
      // var queryEquipe = client.query({
      //     text: 'INSERT INTO equipe_mecanico (codigo_mecanico_1, codigo_mecanico_2)' +
      //           'VALUES ($1,$2) RETURNING id_equipe',
      //     values: [os.mecanico1, os.mecanico2],
      //     name: 'criar_equipe'
      // });
      // queryEquipe.on('row', function(row, resultEquipe) {
      //     resultEquipe.addRow(row);
      // });
      // queryEquipe.on('error', function(error) {
      //     db.checkQueryError(error, client, done, callback);
      // });

          
      var queryOS = client.query({
        text: 'INSERT INTO os (data_emissao,data_conclusao,status,id_equipe,id_agendamento)' +
              'VALUES ($1,$2,0,$3,$4) RETURNING numero_os',
        values: [os.dataEmissao, os.dataConclusao, os.mecanico1, os.agendamento],
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
}

function autorizarOS(os, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);          
      var query = client.query({
        text: 'UPDATE os ' +
              'SET status=1 ' +
              'WHERE numero_os = $1',
        values: [os.numeroOs],
        name: 'criar_os'
      });
      query.on('row', function(row, resultOS) {
          resultOS.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(resultOS) {
       done();
       
       callback(null, resultOS.rows);
      });

  });
}

function finalizarOS(os, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);          
      var query = client.query({
        text: 'UPDATE os ' +
              'SET status=2 ' +
              'WHERE numero_os = $1',
        values: [os.numeroOs],
        name: 'criar_os'
      });
      query.on('row', function(row, resultOS) {
          resultOS.addRow(row);
      });
      query.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      query.on('end', function(resultOS) {
       done();
       
       callback(null, resultOS.rows);
      });

  });
}

function criarServico(servico, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var queryTipoServico = client.query({
          text: 'SELECT id FROM tipo_servico ' +
                'WHERE nome = $1',
          values: [servico.tipoServico],
          name: 'tipo_servico_id'
      });
      queryTipoServico.on('row', function(row, resultTipoServico) {
          resultTipoServico.addRow(row);
      });
      queryTipoServico.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      queryTipoServico.on('end', function(resultTipoServico) {
          var queryServico = client.query({
            text: 'INSERT INTO servico (valor, id_tipo_servico, numero_os)' +
                  'VALUES ($1,$2,$3) RETURNING id',
            values: [servico.valor , resultTipoServico.rows[0].id, servico.numeroOS],
            name: 'criar_servico'
          });
          queryServico.on('row', function(row, resultServico) {
              resultServico.addRow(row);
          });
          queryServico.on('error', function(error) {
              db.checkQueryError(error, client, done, callback);
          });
          queryServico.on('end', function(resultServico) {
           done();
           
           callback(null, resultServico.rows);
      });
      });
  });
}

function atualizarPeca(peca, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var queryTipoServico = client.query({
          text: 'UPDATE peca SET status=0, servico_id=$1 WHERE numero_serie=(SELECT MIN(numero_serie) FROM peca ' +
                'WHERE status = 1)',
          values: [peca.idServico],
          name: 'tipo_servico_id'
      });
      queryTipoServico.on('row', function(row, resultTipoServico) {
          resultTipoServico.addRow(row);
      });
      queryTipoServico.on('error', function(error) {
          db.checkQueryError(error, client, done, callback);
      });
      queryTipoServico.on('end', function(resultTipoServico) {
          var queryServico = client.query({
            text: 'INSERT INTO servico (valor, id_tipo_servico, numero_os)' +
                  'VALUES ($1,$2,$3) RETURNING id',
            values: [peca.valor , resultTipoServico.rows[0].id, peca.numeroOS],
            name: 'criar_servico'
          });
          queryServico.on('row', function(row, resultServico) {
              resultServico.addRow(row);
          });
          queryServico.on('error', function(error) {
              db.checkQueryError(error, client, done, callback);
          });
          queryServico.on('end', function(resultServico) {
           done();
           
           callback(null, resultServico.rows);
      });
      });
  });
}



module.exports = {
  todasOS       : todasOS,
  criarOS       : criarOS,
  autorizarOS   : autorizarOS,
  finalizarOS   : finalizarOS,
  criarServico  : criarServico,
  atualizarPeca : atualizarPeca,
};