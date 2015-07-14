var express 		 = require('express');
var router  		 = express.Router();
var pg      		 = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://tvlqxxjctmdinm:z2rBw-iPhbMbzira6MOliQuEOk@ec2-107-20-222-114.compute-1.amazonaws.com:5432/dekl0ddiqrurco:5432';

/**
*	Rota para a tela de agendamento
*/
router.get('/agendamento', function(req, res) {
  res.render('pages/agendamento');
});




module.exports = router;