var dbOS      = require('../DAL/ordemservico.js');

function doConsultarOs(req, res){
  dbOS.todasOS(function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao pesquisar OS';
          console.error(err);
    } else {
      res.render('pages/consultar_os', { ordemservico: ordemservico });
    }
    res.end();
  });

}

module.exports = {
  doConsultarOs : doConsultarOs,
};
