$('a#editServico').click(function(event) {

    var currentImage = $(this);

    var nome = currentImage.data('nome');
    var desc = currentImage.data('desc');
    var valor = currentImage.data('valor');
    var esp = currentImage.data('esp');
    var id = currentImage.data('id');

    $('#modalSNome').val(nome);

    $('#modalSDesc').val(desc);

    $('#modalSValor').val(valor);

    $('#modalSEsp').val(esp);

    if (id != undefined) {
      $('#formS').attr('action', '../servico/?id=' + id);
      $('h1').text(function(i, oldText) {
        return oldText === 'Adicionar Serviço' ? 'Editar Serviço' : oldText;
      });
      $('input.btn').attr('value', 'Editar Serviço');
    }
});

$('a#editPeca').click(function(event) {

  var currentImage = $(this);

  var nome = currentImage.data('nome');
  var desc = currentImage.data('desc');
  var valor = currentImage.data('valor');
  var quant = currentImage.data('quant');
  var id = currentImage.data('id');

  $('#modalPNome').val(nome);

  $('#modalPDesc').val(desc);

  $('#modalPValor').val(valor);

  $('#modalPQuant').val(quant);

  if (id != undefined) {
    $('#formP').attr('action', '../peca/?id=' + id);
    $('h1').text(function(i, oldText) {
      return oldText === 'Adicionar Peça' ? 'Editar Peça' : oldText;
    });
    $('input.btn').attr('value', 'Editar Peça');
  }
});

$('a#deleteServico').click(function(event) {
  var id_serv = $(this).data('id');
  $('a#deleteSConfirm').attr('href', '/servico/?del=' + id_serv);
});

$('a#deletePeca').click(function(event) {
  var id_peca = $(this).data('id');
  $('a#deletePConfirm').attr('href', '/peca/?del=' + id_peca);
});