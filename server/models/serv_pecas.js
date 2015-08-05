var db_serv_pecas   = require('../DAL/serv_pecas.js');

module.exports = {
  getServicosPecas: getServicosPecas,
  servico:          servico,
  peca:             peca,
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
  
  db_serv_pecas.criarServico(servico,function(){
    res.redirect('/agendamento/serv_pecas');
  });
}

function peca(req, res){
  var obj = req.body;
  var peca = {
    nome: obj.name,
    descricao: obj.description,
    preco: obj.value,
    quantidade: obj.quantity
  };
  console.log(obj);
  db_serv_pecas.criarPeca(peca,function(){
    res.redirect('/agendamento/serv_pecas');
  });
}