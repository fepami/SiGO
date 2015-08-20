var db_mecanicos = require('../DAL/mecanicos.js');

module.exports = {
  getData: getData,
  formarEquipe: formarEquipe,
  verificaEquipe: verificaEquipe,
  deletarEquipe: deletarEquipe,
  getMecanicos : getMecanicos,
  getMecanico : getMecanico,
  deletarMecanico : deletarMecanico,
  salvarMecanico : salvarMecanico,
};

function getMecanicos(req, res) {
  db_mecanicos.todosMecanicos(function(err, mecanicos){
    var data = {}
    if (req.query != undefined) 
      data = req.query;

    data.mecanicos = mecanicos ? mecanicos : [];
    res.render('pages/mecanicos', { data: data } );
  });
}

function getMecanico(req, res) {
  if (req.query.cod == undefined){ 
    res.json( {mecanico : {}} );
    return;
  }
  db_mecanicos.mecanicoById(req.query.cod, function(err, mecanico){
    res.json( mecanico );
  });
}

function getData(req, res) {
  db_mecanicos.todasEquipes(function(err, equipes){
    db_mecanicos.todosMecanicos(function(err, mecanicos){
      var data = {};
      if (req.query != undefined) {
        data = req.query;
      }
      if(equipes)
        data.equipes = equipes;
      else
        data.equipes = [];

      if(mecanicos)
        data.mecanicos = mecanicos;
      else
        data.mecanicos = [];
      res.render('pages/equipes', { data: data } );
    });
  });
}

function formarEquipe(req, res) {
  if (req.query != undefined) {
    db_mecanicos.createEquipe(req.query, function(err, eq){
      res.redirect('/equipes/?c=t');
    });
  } else {
    res.redirect('/equipes/?e=t');
  }
}

function verificaEquipe(req, res) {
  var mecanicos = req.query;
  db_mecanicos.getEquipeByIds(mecanicos, function(err, id){
    if (id != undefined) {
      res.json( {found: true} );
    } else {
      res.json( {found: false} );
    }
  });
}

function deletarMecanico(req, res) {
  if (req.query.del != undefined) {
    db_mecanicos.deleteMecanico(req.query.del, function(err, id){
      if(err)
        console.log(err);
      res.redirect('/mecanicos/?d=t');
    });
  } else {
    res.redirect('/mecanicos/?e=t');
  }
}

function deletarEquipe(req, res) {
  if (req.query.del != undefined) {
    db_mecanicos.deleteEquipe(req.query.del, function(err, id){
      if(err)
        console.log(err);
      res.redirect('/equipes/?d=t');
    });
  } else {
    res.redirect('/equipes/?e=t');
  }
}

function salvarMecanico(req, res) {
  mecanico = {}
    
  mecanico.nome = req.body.name;
  mecanico.end_rua = req.body.address;
  mecanico.end_complemento = req.body.comp;
  mecanico.end_cep = req.body.cep;
  mecanico.end_cidade = req.body.city;
  mecanico.end_estado = req.body.state;
  mecanico.telefone_1 = req.body.phone;
  mecanico.telefone_2 = req.body.cellphone;
  mecanico.especialidade = req.body.especialidade;
  if(req.query.cod){
    mecanico.codigo_mecanico = req.query.cod;
    db_mecanicos.updateMecanico(mecanico, function(err, mecanico){
      if(err)
        res.redirect('/mecanicos/?e=t');
      else
        res.redirect('/mecanicos/?u=t');
    });
  }else{
    db_mecanicos.createMecanico(mecanico, function(err, id){
      if(err)
        res.redirect('/mecanicos/?e=t');
      else
        res.redirect('/mecanicos/?c=t');
    });
  }
}
