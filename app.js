var express = require('express');
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var app     = express();
var routes  = require('./server/routes/index.js');
var db		= require('./server/models/database.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/client/public'));

// views is directory for all template files
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2']
}));

app.use(function(req, res, next){
	var err = req.session.error;
	if (err){
		console.log(err);
		// msg to Jade
		// res.locals.message = '<p class="msg error">' + err + '</p>';
		req.session.error = null;
	}

	next();
});

app.use('/', routes);

app.listen(app.get('port'), function() {
  	console.log('Node app is running on port', app.get('port'));
});