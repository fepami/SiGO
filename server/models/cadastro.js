var dbUser      = require('../DAL/usuario.js');
var util        = require('./util.js');
var dbCliente   = require('../DAL/cliente.js');

function do_cadastro(req, res){
  /* Tratamento para verificação de usuário */
  if (req.query.n != undefined) {
    dbUser.findUserByName(req.query.n, function(err, user){
      if (user != undefined) {
        res.json( {user: user} );
      } else {
        res.json( {} );
      }
    });
  } else {
    var user = {};
    user.senha = req.body.password;
    util.generateSaltHash(user, function(){
      user.nome_usuario = req.body.username;
      user.nivel_acesso = 3                     /*  Tipo Cliente */
      user.email = req.body.email;
      dbUser.createUsuario(user, function(err, user){
        if (err != undefined) {
          console.log('Erro ao criar usuário');
          console.log(err);
          res.redirect('/cadastro');
        } else {
          cadastro_cliente(req.body, function(){
            res.redirect('/cadastro');
        });
        }
      });
    });
  }
}

function cadastro_cliente(user, callback){
  var cliente = {};
  cliente.nome_usuario = user.username;
  cliente.nome = user.name;
  cliente.end_rua = user.address;
  cliente.end_complemento = user.comp;
  cliente.end_cidade = user.city;
  cliente.end_estado = user.state;
  cliente.telefone_1 = user.phone;
  cliente.telefone_2 = user.cellphone;
  dbCliente.createCliente(cliente, function(){
    callback();
  });
}

module.exports = {
  do_cadastro : do_cadastro,
};
