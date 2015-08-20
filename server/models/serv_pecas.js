var db_serv_pecas   = require('../DAL/serv_pecas.js');

module.exports = {
  getServicosPecas: getServicosPecas,
  servico:          servico,
  peca:             peca,
};

function getServicosPecas(req, res){
  var params = {};
  params = req.query;
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
        res.render('pages/serv_pecas', { params: params } )
      }
      res.end();
    });
  
  });
}

function servico(req, res){
  var obj = req.body;
  var servico = {
    nome: obj.name,
    descricao: obj.description,
    especialidade: obj.role,
    valor_mao_obra: obj.value
  };
  if (req.query.id != undefined) {
    servico.id = req.query.id;
    db_serv_pecas.editarServico(servico, function(){
      res.redirect('/serv_pecas/?serv_e=t');
    });
  } else if (req.query.del != undefined) {
    db_serv_pecas.deleteServico(req.query.del, function(){
      res.redirect('/serv_pecas/?serv_d=t');
    })
  } else {
    db_serv_pecas.criarServico(servico,function(){
      res.redirect('/serv_pecas/?serv=t');
    });
  }
}

function peca(req, res){
  var obj = req.body;
  var peca = {
    nome: obj.name,
    descricao: obj.description,
    preco: obj.value,
    quantidade: obj.quantity
  };
  if (req.query.id != undefined) {
    peca.id = req.query.id;
    db_serv_pecas.editarPeca(peca, function(){
      res.redirect('/serv_pecas/?peca_e=t');
    });
  } else if (req.query.del != undefined) {
    db_serv_pecas.deletePeca(req.query.del, function(){
      res.redirect('/serv_pecas/?peca_d=t');
    });
  } else {
    db_serv_pecas.criarPeca(peca,function(){
      res.redirect('/serv_pecas/?peca=t');
    });
  }
}