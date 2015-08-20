var db_cliente = require('../DAL/cliente.js');

module.exports = {
  getData: getData,
  addVeiculo: addVeiculo,
  deleteVeiculo: deleteVeiculo,
};

function getData(req, res) {
  if (req.query.u != undefined) {
    db_cliente.clienteByNomeUsuario(req.query.u, function(err, cliente){
      db_cliente.getVeiculosByNomeUsuario(req.query.u, function(err, veiculos){
        var params = req.query;
        params.cliente = cliente;
        params.veiculos = veiculos;
        res.render('pages/dados_cliente', { params: params } );
      });
    });
  }
}

function addVeiculo(req, res) {
  var dados = req.body;
  var veiculo = {
    renavam: dados.renavam,
    placa: dados.placa,
    marca: dados.marca,
    modelo:dados.model,
    ano: dados.age,
    nome_usuario: req.query.u
  };
  db_cliente.insertVeiculo(veiculo, function(err, veiculo){
    res.redirect('/cliente/?u=' + req.query.u + '&v=t');
  });
}

function deleteVeiculo(req, res) {
  if (req.query.u != undefined && req.query.del != undefined) {
    db_cliente.delVeiculo(req.query.del, function(err, renavam){
      res.redirect('/cliente/?u=' + req.query.u + '&d=t');
    });
  } 
}