var dbOS            = require('../DAL/ordemservico.js');
var db_serv_pecas   = require('../DAL/serv_pecas.js');
var db_func         = require('../DAL/funcionario.js');

function doConsultarOs(req, res){
  var params = {};
  
  db_serv_pecas.todosServicos(function(err, servicos){
    if (err) {
      req.session.error = 'Falha ao buscar serviços';
        console.error(err);
    } else {
      params.servicos = servicos;
    }

    db_func.todosMecanicos(function(err, mecanicos){
      if (err) {
        req.session.error = 'Falha ao buscar mecanicos';
        console.error(err);
      } else {
        params.mecanicos = mecanicos;
      }
    });

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
  if(req.query.m1 == undefined || req.query.m2 == undefined || req.query.de == undefined || req.query.dc == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var os = {};
  os.mecanico1     = req.query.m1;
  os.mecanico2     = req.query.m2;
  os.dataConclusao = req.query.dc;
  os.dataEmissao   = req.query.de;
  
  dbOS.criarOS(os, function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao criar OS';
          console.error(err);
    } else {
      //res.render('pages/criar_os', { ordemservico: ordemservico });
    }
    res.end();
  });

}

module.exports = {
  doConsultarOs : doConsultarOs,
  doCriarOs : doCriarOs,
};
