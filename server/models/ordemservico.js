var dbOS      = require('../DAL/ordemservico.js');
var db_serv_pecas   = require('../DAL/serv_pecas.js');

function doConsultarOs(req, res){
  var params = {}
  
  db_serv_pecas.todosServicos(function(err, servicos){
    if (err) {
      req.session.error = 'Falha ao buscar serviços';
        console.error(err);
    } else {
      params.servicos = servicos;
    }

    db_serv_pecas.todasPecas(function(err, pecas){
      if (err) {
        req.session.error = 'Falha ao buscar pecas';
      } else {
        params.pecas = pecas;
        res.render('pages/consultar_os', { params: params } )
      }
      res.end();
    });
  
  });

}

function doCriarOs(req, res){
  dbOS.todasOS(function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao pesquisar OS';
          console.error(err);
    } else {
      res.render('pages/criar_os', { ordemservico: ordemservico });
    }
    res.end();
  });

}

module.exports = {
  doConsultarOs : doConsultarOs,
  doCriarOs : doCriarOs,
};
