var db    = require('../DAL/usuario.js');
var util  = require('./util.js');

function do_autentication(user, pass, fn){
  util.hash(pass, user.salt, function(err, hash){
    if(err)
      return fn(err);
    if (hash == user.hash)
      return fn(null, user);
    fn(new Error('invalid password'));
  });
}

function authenticate(name, pass, fn) {
  console.log('authenticating %s:%s', name, pass);
  db.findUserByName(name, function(error, user){
    if (error){
      db.findUserByEmail(name, function(error, user){
        if(error){
          fn("user not found");
        } else {
          do_autentication(user, pass, fn);
        }
      });
    }else{
      do_autentication(user, pass, fn);
    }
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
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
        res.redirect('/agendamento/consultar');
      } else {
        req.session.error = 'Authentication failed, please check your username and password.';
        if (err == "user not found"){
          res.redirect('/?invalid_user=t');
        } else {
          res.redirect('/?invalid_pass=t');
        }
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