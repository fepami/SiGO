var db_mecanicos = require('../DAL/mecanicos.js');

module.exports = {
  getData: getData,
  formarEquipe: formarEquipe,
  verificaEquipe: verificaEquipe,
  deletarEquipe: deletarEquipe,
};

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
      res.render('pages/mecanicos', { data: data } );
    });
  });
}

function formarEquipe(req, res) {
  if (req.query != undefined) {
    db_mecanicos.createEquipe(req.query, function(err, eq){
      res.redirect('/mecanicos/?c=t');
    });
  } else {
    res.redirect('/mecanicos/?e=t');
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

function deletarEquipe(req, res) {
  if (req.query.del != undefined) {
    db_mecanicos.deleteEquipe(req.query.del, function(err, id){
      res.redirect('/mecanicos/?d=t');
    });
  } else {
    res.redirect('/mecanicos/?e=t');
  }
}