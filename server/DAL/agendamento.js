var db = require('./database.js');

module.exports = {
  todosAgendamentos       : todosAgendamentos,
  todosAgendamentosAtivos : todosAgendamentosAtivos,
  agendamentoByDia        : agendamentoByDia,
  agendamentoPorId        : agendamentoPorId,
  criarAgendamento        : criarAgendamento,
  cancelarAgendamento     : cancelarAgendamento,
  editarAgendamento       : editarAgendamento,

};

function criarAgendamento(agendamento, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'INSERT INTO agendamento(data, hora, status, renavam_veiculo) ' +
      	'VALUES ($1, $2, 1, $3) RETURNING id, data, hora',
      values: [agendamento.data, agendamento.hora,
      	agendamento.renavam_veiculo],
      name: 'create_agendamento'
    });
  	query.on('row', function(row, result) {
  		switch ( row.hora ){
            case 1 :{
              row.hora = "08:00 - 09:00";
              break;
            }
            case 2 :{
              row.hora = "09:00 - 10:00";
              break;
            }
            case 3 :{
              row.hora = "10:00 - 11:00";
              break;
            }
            case 4 :{
              row.hora = "11:00 - 12:00";
              break;
            }
            case 5 :{
              row.hora = "12:00 - 13:00";
              break;
            }
            case 6 :{
              row.hora = "13:00 - 14:00";
              break;
            }
            case 7 :{
              row.hora = "14:00 - 15:00";
              break;
            }
            case 8 :{
              row.hora = "15:00 - 16:00";
              break;
            }
            case 9 :{
              row.hora = "16:00 - 17:00";
              break;
            }
            case 10:{
              row.hora = "17:00 - 18:00";
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
  		agendamento.id = result.rows[0].id;
      callback(null, result.rows);
  	});
	});
}

function todosAgendamentos(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, status, renavam_veiculo FROM agendamento',
          values: [],
          name: 'todos_agendamentos_ativos'
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

function todosAgendamentosAtivos(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, status, renavam_veiculo FROM agendamento WHERE status = 1',
          values: [],
          name: 'todos_agendamentos_ativos'
      });
      query.on('row', function(row, result) {
          switch ( row.hora ){
            case 1 :{
              row.hora = "08:00 - 09:00";
              break;
            }
            case 2 :{
              row.hora = "09:00 - 10:00";
              break;
            }
            case 3 :{
              row.hora = "10:00 - 11:00";
              break;
            }
            case 4 :{
              row.hora = "11:00 - 12:00";
              break;
            }
            case 5 :{
              row.hora = "12:00 - 13:00";
              break;
            }
            case 6 :{
              row.hora = "13:00 - 14:00";
              break;
            }
            case 7 :{
              row.hora = "14:00 - 15:00";
              break;
            }
            case 8 :{
              row.hora = "15:00 - 16:00";
              break;
            }
            case 9 :{
              row.hora = "16:00 - 17:00";
              break;
            }
            case 10:{
              row.hora = "17:00 - 18:00";
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

function agendamentoByDia(dia, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, status, renavam_veiculo ' +
            'FROM agendamento WHERE data = $1 AND status = 1',
          values: [dia],
          name: 'agendamento_by_dia'
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

function agendamentoPorId(id, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, status, renavam_veiculo ' +
            'FROM agendamento WHERE id = $1',
          values: [id],
          name: 'agendamento_por_dia'
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

function cancelarAgendamento(agendamento, callback){
    db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text:   'UPDATE agendamento SET status = 0 WHERE id = $1',
          values: [agendamento],
          name:   'cancelar_agendamento'
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


function editarAgendamento(agendamento, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'UPDATE agendamento SET data = $1, hora = $2' +
            'WHERE id = $3 RETURNING data, hora',
      values: [agendamento.data, agendamento.hora, agendamento.id],
      name: 'create_agendamento'
    });
    query.on('row', function(row, result) {
      result.addRow(row);
      switch ( row.hora ){
            case 1 :{
              row.hora = "08:00 - 09:00";
              break;
            }
            case 2 :{
              row.hora = "09:00 - 10:00";
              break;
            }
            case 3 :{
              row.hora = "10:00 - 11:00";
              break;
            }
            case 4 :{
              row.hora = "11:00 - 12:00";
              break;
            }
            case 5 :{
              row.hora = "12:00 - 13:00";
              break;
            }
            case 6 :{
              row.hora = "13:00 - 14:00";
              break;
            }
            case 7 :{
              row.hora = "14:00 - 15:00";
              break;
            }
            case 8 :{
              row.hora = "15:00 - 16:00";
              break;
            }
            case 9 :{
              row.hora = "16:00 - 17:00";
              break;
            }
            case 10:{
              row.hora = "17:00 - 18:00";
              break;
            }
          }
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