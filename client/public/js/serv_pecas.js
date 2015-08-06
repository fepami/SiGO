$('a#linkServico').click(function(event) {

    var clickedLink = $(event.currentTarget); 
    var currentImage = clickedLink.children('h4');

    var nome = currentImage.data('nome');
    var desc = currentImage.data('desc');
    var valor = currentImage.data('valor');

    $('#modalSNome').text(nome);
    $('#modalSNome').attr({ class: "up-first-letter"});

    $('#modalSDesc').text(desc);
    $('#modalSDesc').attr({ class: "up-first-letter"});

    $('#modalSValor').text( "Valor do serviço: R$" + valor + ",00");
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