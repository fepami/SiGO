var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/login')
});

app.get('/agendamento', function(request, response) {
  response.render('pages/agendamento', {
    usuario: 'foo',
    nivel_acesso: '0',
  })
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      console.log(err);
      response.send("Error " + err);
      return;
    }
    client.query('SELECT * FROM veiculo', function(err, result) {
      if (err) { 
        console.log(err); response.send("Error: " + err);
      }
      else { 
        console.log('\nBanco:');
        console.log(result.rows);
        response.render('pages/db', {results: result.rows} ); 
      }
      done();
    });
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


