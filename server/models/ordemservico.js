var dbOS            = require('../DAL/ordemservico.js');
var db_serv_pecas   = require('../DAL/serv_pecas.js');
var db_func         = require('../DAL/funcionario.js');
var db_agendamento  = require('../DAL/agendamento.js');
var db_mecanicos    = require('../DAL/mecanicos.js');

function doConsultarOs(req, res){
  
  var params = {}; // Todas os dados necessarios para montar a view 'Abrir OS'
  
  db_serv_pecas.todosServicos(function(err, servicos){
    if (err) {
      req.session.error = 'Falha ao buscar serviços';
        console.error(err);
    } else {
      params.servicos = servicos;                             // S E R V I C O S

      db_mecanicos.todasEquipes(function(err, equipes){
        if (err) {
          req.session.error = 'Falha ao buscar equipes';
          console.error(err);
        } else {
          params.equipes = equipes;                           // E Q U I P E S

          db_agendamento.todosAgendamentosCliente(function(err, agendamentos){
            if (err) {
              req.session.error = 'Falha ao buscar agendamentos';
              console.error(err);
            } else {
              params.agendamentos = agendamentos;             // A G E N D A M E N T O S

              db_serv_pecas.todasPecas(function(err, pecas){
                if (err) {
                  req.session.error = 'Falha ao buscar pecas';
                } else {
                  params.pecas = pecas;                       // P E C A S 

                  dbOS.todasOS(function(err, os){
                    if (err) {
                      req.session.error = 'Falha ao buscar os';
                    } else {
                      params.os = os;                         // O S 

                      res.render('pages/consultar_os', { params: params } )
                    }
                    res.end();
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

function doAutorizaOs(req, res){
  if(req.query.nos == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var os = {};
  os.numeroOs = req.query.nos;
  
  dbOS.autorizarOS(os, function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao autorizar OS';
          console.error(err);
          res.send(false);
    } else {
      res.send(true);
    }
    res.end();
  });
}

function doFinalizaOs(req, res){
  if(req.query.nos == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var os = {};
  os.numeroOs = req.query.nos;
  
  dbOS.finalizarOS(os, function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao autorizar OS';
          console.error(err);
          res.send(false);
    } else {
      res.send(true);
    }
    res.end();
  });
}

function doCriarOs(req, res){
  if(req.query.m1 == undefined || req.query.de == undefined || req.query.dc == undefined || req.query.a == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var os = {};
  os.mecanico1     = req.query.m1;
  os.dataConclusao = req.query.dc;
  os.dataEmissao   = req.query.de;
  os.agendamento   = req.query.a;
  
  dbOS.criarOS(os, function(err, ordemservico){
    if(err){
      req.session.error = 'Falha ao criar OS';
          console.error(err);
          res.send(false);
    } else {
      res.send({ordemservico : ordemservico});
    }
    res.end();
  });

}

function doCriarServico(req, res){
  if(req.query.ts == undefined || req.query.v == undefined || req.query.nos == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var servico = {};
  servico.tipoServico   = req.query.ts;
  servico.valor         = req.query.v;
  servico.numeroOS      = req.query.nos;
  
  dbOS.criarServico(servico, function(err, servico){
    if(err){
      req.session.error = 'Falha ao criar Servico';
          console.error(err);
          res.send(false);
    } else {
      res.send({servico : servico});
    }
    res.end();
  });

}

function doAtualizarPeca(req, res){
  if(req.query.tp == undefined || req.query.is == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var peca = {};
  peca.tipoPeca      = req.query.tp;
  peca.idServico     = req.query.is;
  
  dbOS.atualizarPeca(peca, function(err, peca){
    if(err){
      req.session.error = 'Falha ao atualizar peca';
          console.error(err);
          res.send(false);
    } else {
      res.send({peca : peca});
    }
    res.end();
  });

}

module.exports = {
  doConsultarOs   : doConsultarOs,
  doCriarOs       : doCriarOs,
  doAutorizaOs    : doAutorizaOs,
  doFinalizaOs    : doFinalizaOs,
  doCriarServico  : doCriarServico,
  doAtualizarPeca : doAtualizarPeca,
};
