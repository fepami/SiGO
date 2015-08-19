$('a#linkServico').click(function(event) {

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
      $('#form').attr('action', '../servico/?id=' + id);
      $('h1').text(function(i, oldText) {
        return oldText === 'Adicionar Serviço' ? 'Editar Serviço' : oldText;
      });
      $('input.btn').attr('value', 'Editar Serviço');
    }
});

$('a#linkPeca').click(function(event) {

    var clickedLink = $(event.currentTarget); 
    var currentImage = clickedLink.children('h4');

    var nome = currentImage.data('nome');
    var desc = currentImage.data('desc');
    var valor = currentImage.data('valor');
    var quant = currentImage.data('quant');

    $('#modalPNome').text(nome);
    $('#modalPNome').attr({ class: "up-first-letter"});

    $('#modalPDesc').text(desc);
    $('#modalPDesc').attr({ class: "up-first-letter"});

    $('#modalPValor').text( "Valor de uma peça: R$" + valor + ",00");
    
    $('#modalPQuant').text( "Quantidade disponível: " + quant);
});