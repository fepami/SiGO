var dbUser      = require('../DAL/usuario.js');
var util        = require('./util.js');
var dbCliente   = require('../DAL/cliente.js');

module.exports = {
  do_cadastro : do_cadastro,
  do_funcionario_cadastro: do_funcionario_cadastro,
};

function do_cadastro(req, res) {
  /* Tratamento para verificação de usuário e email */
  if (req.query.u != undefined) {
    if(req.query.u == ""){
      res.json( {user: ""} );
      return;
    }
    dbUser.findUserByName(req.query.u, function(err, user){
      if (user != undefined) {
        res.json( {user: user} );
      } else {
        res.json( {} );
      }
    });
  } else if (req.query.e != undefined) {
    dbUser.findUserByEmail(req.query.e, function(err, email){
      if (email != undefined) {
        res.json( {email: email} );
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
            res.redirect('/?cadastro=t');
        });
        }
      });
    });
  }
}

function cadastro_cliente(user, callback) {
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

function do_funcionario_cadastro(req, res) {
  var func = req.body;
  var func_dados = {
    senha: func.password
  };
  util.generateSaltHash(func_dados, function(){
    func_dados.nome_usuario = func.username;
    if (removerAcentos(func.staff.toLowerCase()) == "atendente") func_dados.nivel_acesso = 1;
    else if (removerAcentos(func.staff.toLowerCase()) == "tecnico") func_dados.nivel_acesso = 2;
    func_dados.email = func.email;
    dbUser.createUsuario(func_dados, function(err, user){
      if (err != undefined) {
        console.log('Erro ao criar funcionário');
        console.log(err);
        res.redirect('/cadastro/funcionario');
      } else {
        cadastro_funcionario(func, function(){
          res.redirect('/?cadastro=t');
        });
      }
    });
  });
}

function cadastro_funcionario(func, callback) {
  var funcionario = {
    nome_usuario: func.username,
    nome: func.name,
    end_rua: func.address,
    end_complemento: func.comp,
    end_cep: func.cep,
    end_cidade: func.city,
    end_estado: func.state,
    telefone_1: func.phone,
    telefone_2: func.cellphone,
    salario: func.sal,
    cargo: func.staff
  };
  dbUser.createFuncionario(funcionario, function(){
    callback();
  });
}

function removerAcentos( string ) {
  var mapaAcentosHex  = {
    a : /[\xE0-\xE6]/g,
    e : /[\xE8-\xEB]/g,
    i : /[\xEC-\xEF]/g,
    o : /[\xF2-\xF6]/g,
    u : /[\xF9-\xFC]/g,
    c : /\xE7/g,
    n : /\xF1/g
  };

  for ( var letra in mapaAcentosHex ) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace( expressaoRegular, letra );
  }

  return string;
}