var novoServicoAppend;
var novaPecaAppend;

$(window).load(function(){

    novoServicoAppend = $(".servico-model").html();
    novaPecaAppend    = $(".peca-model").html();
});

$('a.botao-adicionar-servico').click(function(event) {
    $(".servico-model").html(function(){
        $(this).append(novoServicoAppend);
    });
});

$('a.botao-adicionar-peca').click(function(event) {
    $(".peca-model").html(function(){
        $(this).append(novaPecaAppend);
    });
});
