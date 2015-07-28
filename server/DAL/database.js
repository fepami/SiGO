var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://tvlqxxjctmdinm:z2rBw-iPhbMbzira6MOliQuEOk@ec2-107-20-222-114.compute-1.amazonaws.com:5432/dekl0ddiqrurco:5432';

module.exports = {
  connect               : connect,
  end                   : end,
  checkConnectionError  : checkConnectionError,
  checkQueryError       : checkQueryError,
};

function connect(callback){
  pg.connect(connectionString, callback);
}

function end(){
  pg.end();
}

function checkConnectionError(error, callback){
	if (error){
		// console.error('A connection error has happened. Error: ' + error);
		callback(error);
	}
}

function checkQueryError(error, client, done, callback){
	if(error){
		done(client);
		callback(error);
	}
}
