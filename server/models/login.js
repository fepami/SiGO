var db 		= require('../DAL/usuario.js');
var util	= require('./util.js');

function authenticate(name, pass, fn) {
	console.log('authenticating %s:%s', name, pass);
	db.findUserByName(name, function(error, user){
		if (error)
			return fn(error);

		util.hash(pass, user.salt, function(err, hash){
			if(err)
				return fn(err);

			if (hash == user.hash)
				return fn(null, user);

			fn(new Error('invalid password'));
		});
	});
}

function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/');
	}
}

function do_login(req, res){
	authenticate(req.body.username, req.body.password, function(err, user){
    	if (user) {
    		req.session.user = user;
    		res.redirect('/agendamento');
    	} else {
      		req.session.error = 'Authentication failed, please check your username and password.';
        	console.error(err);
      		res.redirect('/');
    	}
  	});
}

function do_logout (req, res) {
	req.session = null;
	res.redirect('/');
}

module.exports = {
	restrict : restrict,
	do_login : do_login,
	do_logout : do_logout,
};