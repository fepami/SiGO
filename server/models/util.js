var crypto	= require('crypto');
var salt_len = Number(process.env.SALT_LEN || 128)
var hash_iterations = Number(process.env.HASH_ITERATIONS || 12000)

module.exports = {
	salt : salt,
	hash : hash,
	generateSaltHash : generateSaltHash
};

// Passar usuario com senha,
// callback terá usuario com salt e hash da mesma
function generateSaltHash(user, callback){
	salt(function(err, salt){
		if(err)
			return callback(err);
		user.salt = salt;

		hash(user.senha, user.salt, function(err, hash){
			if(err)
				return callback(err);
			user.hash = hash;
			user.senha = null;
			callback(null, user);
		});
	});
}

// var usuarios = [
// 	{ nome_usuario: 'admin', senha : 'admin'},
// ];
// for (var i = usuarios.length - 1; i >= 0; i--) {
// 	generateSaltHash(usuarios[i], function(err, user){
// 		if(err)
// 			console.error(err);
// 		else
// 			console.log('\'' + user.nome_usuario + '\', \'' + user.salt + '\', \'' + user.hash + '\'');

// 	});
// };

function salt(fn){
	crypto.randomBytes(salt_len, function(err, salt){
		if (err)
			return fn(err);
		fn(null, salt.toString('base64'));
	});
}

function hash(pwd, salt, fn){
	crypto.pbkdf2(pwd, salt, hash_iterations, salt_len, function(err, hash){
		if(err)
			fn(err);
		else
			fn(null, hash.toString('base64'));
	});
}