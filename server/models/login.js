var crypto = require('crypto');
var salt_len = Number(process.env.SALT_LEN || 128)
var hash_iterations = Number(process.env.HASH_ITERATIONS || 12000)

var users = {
	  admin: {
	  		name: 'admin',
	  		user_role: 1
	  }
};

salt(function(err, salt){
	if (err)
		return console.error(err);

	users['admin'].salt = salt;

	hash('admin', salt, function(err, hash){
		if (err)
			return console.error(err);
		users['admin'].hash = hash.toString();
	});
});

function salt(fn){
	crypto.randomBytes(salt_len, function(err, salt){
		if (err)
			return fn(err);
		fn(null, salt.toString('base64'));
	});
}

function hash(pwd, salt, fn){
	crypto.pbkdf2(pwd, salt, hash_iterations, salt_len, fn);
}

function authenticate(name, pass, fn) {
	console.log('authenticating %s:%s', name, pass);
	var user = users[name];

	if (!user)
		return fn(new Error('cannot find user'));

	hash(pass, user.salt, function(err, hash){
		if(err)
			return fn(err);

		if (hash.toString() == user.hash)
			return fn(null, user);

		fn(new Error('invalid password'));
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
	salt : salt,
	hash : hash,
};