var salt_len = Number(process.env.SALT_LEN || 128)
var hash_iterations = Number(process.env.HASH_ITERATIONS || 12000)

module.exports = {
	salt : salt,
	hash : hash,
};

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
			fn(null, hash.toString());
	});
}