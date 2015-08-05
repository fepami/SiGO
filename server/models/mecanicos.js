var db_mecanicos = require('../DAL/mecanicos.js');

module.exports = {
  getEquipes: getEquipes,
};

function getEquipes(req, res){
  db_mecanicos.todasEquipes(function(err, equipes){
    console.log(equipes)
    res.render('pages/mecanicos');
  });
}