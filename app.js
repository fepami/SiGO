var express = require('express');
var app     = express();
var routes  = require('./server/routes/index.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/client/public'));

// views is directory for all template files
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('pages/login')
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


