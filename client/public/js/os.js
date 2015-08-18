var novoServicoAppend;
var novaPecaAppend;
var quantidadeServico;
var quantidadePeca;

$(window).load(function(){

    novoServicoAppend = $(".selecionar_servico").html();
    novaPecaAppend    = $(".selecionar_peca_modelo").html();
});

$('a.botao-adicionar-servico').click(function(event) {
    $(".selecionar_servico").html(function(){
        $(this).append(novoServicoAppend);
    });
});

$('body').on('click', 'a.botao-adicionar-peca', function(e){
    $(this).siblings('.selecionar_peca_modelo').html(function(){
        $(this).append(novaPecaAppend);
    });
});

$('body').on('click', 'a.botao-remover-servico', function(e){
	$(this).parent().parent().remove();
});
$('#botao-abrir-os').click(function(){

	alert("teste");
});