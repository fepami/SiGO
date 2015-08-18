var dbOS            = require('../DAL/ordemservico.js');
var db_serv_pecas   = require('../DAL/serv_pecas.js');
var db_func         = require('../DAL/funcionario.js');
var db_agendamento  = require('../DAL/agendamento.js');
var db_mecanicos    = require('../DAL/mecanicos.js');

function doConsultarOs(req, res){
  var params = {};
  
  db_serv_pecas.todosServicos(function(err, servicos){
    if (err) {
      req.session.error = 'Falha ao buscar serviços';
        console.error(err);
    } else {
      params.servicos = servicos;
    }

    db_mecanicos.todasEquipes(function(err, equipes){
      if (err) {
        req.session.error = 'Falha ao buscar Equipes';
        console.error(err);
      } else {
        params.equipes = equipes;
      }
    });

    db_agendamento.todosAgendamentosCliente(function(err, agendamentos){
      if (err) {
        req.session.error = 'Falha ao buscar agendamentos';
        console.error(err);
      } else {
        params.agendamentos = agendamentos;
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
  if(req.query.m1 == undefined || req.query.de == undefined || req.query.dc == undefined){
    req.session.error = 'Bad Request';
      console.error(req.session.error);
      res.end();
      return;
  }

  var os = {};
  os.mecanico1     = req.query.m1;
  os.dataConclusao = req.query.dc;
  os.dataEmissao   = req.query.de;
  
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
  doConsultarOs : doConsultarOs,
  doCriarOs : doCriarOs,
  doCriarServico : doCriarServico,
  doAtualizarPeca : doAtualizarPeca,
};
