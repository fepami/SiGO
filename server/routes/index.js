var express 		 = require('express');
var router  		 = express.Router();
var pg      		 = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://tvlqxxjctmdinm:z2rBw-iPhbMbzira6MOliQuEOk@ec2-107-20-222-114.compute-1.amazonaws.com:5432/dekl0ddiqrurco:5432';

var client = new pg.Client(connectionString);
/**
*	Rota para a tela de login
*/
router.get('/', function(req, res) {
  res.render('pages/login')
});

/**
*	Rota para a tela de agendamento
*/
router.get('/agendamento', function(req, res) {
  	
  	client.connect(function(err) {
  		if(err) {
    		return console.error('could not connect to postgres', err);
  	}

	  	var query = client.query("SELECT nome FROM cliente");

	  	query.on("row", function (row, result) {
    		result.addRow(row);
		});

		query.on("end", function (result) {
    		console.log(JSON.stringify(result.rows, null, "    "));
    		res.render('pages/agendamento');
    		client.end();
    	});
	});
});


module.exports = router;