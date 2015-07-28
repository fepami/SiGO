var db = require('./database.js');

module.exports = {
  createAgendamento  : createAgendamento,
  allAgendamento     : allAgendamento,
  agendamentoByDia   : agendamentoByDia,
  criarAgendamento   : criarAgendamento,
};

function createAgendamento(agendamento, callback){
	db.connect(function(err, client, done){
		db.checkConnectionError(err, callback);
    var query = client.query({
      text: 'INSERT INTO agendamento(data, hora, renavam_veiculo) ' +
      	'VALUES ($1, $2, $3) RETURNING id',
      values: [agendamento.data, agendamento.hora,
      	agendamento.renavam_veiculo],
      name: 'create_agendamento'
    });
  	query.on('row', function(row, result) {
  		result.addRow(row);
  	});
  	query.on('error', function(error) {
  		db.checkQueryError(error, client, done, callback);
  	});
  	query.on('end', function(result) {
  		done();
  		agendamento.id = result.rows[0].id;
      callback(null, agendamento);
  	});
	});
}

function allAgendamento(callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, renavan_veiculo FROM agendamento',
          values: [],
          name: 'all_agendamento'
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

function agendamentoByDia(dia, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'SELECT id, data, hora, renavam_veiculo ' +
            'FROM agendamento WHERE data = $1',
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

function criarAgendamento(renavam, data, hora, callback){
  db.connect(function(err, client, done){
    db.checkConnectionError(err, callback);
      var query = client.query({
          text: 'INSERT INTO agendamento(data, hora, renavam_veiculo) ' +
            'VALUES ($1, $2, $3) RETURNING id',
          values: [data, hora, renavam],
          name: 'criar_agendamento'
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