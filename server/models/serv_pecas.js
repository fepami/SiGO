var db_serv_pecas   = require('../DAL/serv_pecas.js');

module.exports = {
  getServicosPecas: getServicosPecas,
};

function getServicosPecas(req, res){
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
        console.log(params);
        res.render('pages/serv_pecas', { params: params } )
      }
      res.end();
    });
  
  });
}