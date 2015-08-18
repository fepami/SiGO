var db_mecanicos = require('../DAL/mecanicos.js');

module.exports = {
  getData: getData,
  formarEquipe: formarEquipe,
};

function getData(req, res){
  db_mecanicos.todasEquipes(function(err, equipes){
    db_mecanicos.todosMecanicos(function(err, mecanicos){
      var data = {
        equipes: equipes,
        mecanicos: mecanicos
      };
      res.render('pages/mecanicos', { data: data } );
    });
  });
}

function formarEquipe(req, res){
  db_mecanicos.getIdByNomes(req.query, function(err, ids){
    var equipe = {
      mecanico1: ids[0].codigo_mecanico,
      mecanico2: ids[1].codigo_mecanico,
    };
    db_mecanicos.createEquipe(equipe, function(err, eq){
      res.end();
    });
  });
}