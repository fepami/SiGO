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
	var dataConclusao = {};
	dataConclusao.dia = $(".dia option:selected").text();
	dataConclusao.mes = $(".mes option:selected").text();
	switch (dataConclusao.mes){
		case "Janeiro":{
			dataConclusao.mes = "01";
			break;
		}
		case "Fevereiro":{
			dataConclusao.mes = "02";
			break;
		}
		case "Março":{
			dataConclusao.mes = "03";
			break;
		}
		case "Abril":{
			dataConclusao.mes = "04";
			break;
		}
		case "Maio":{
			dataConclusao.mes = "05";
			break;
		}
		case "Junho":{
			dataConclusao.mes = "06";
			break;
		}
		case "Julho":{
			dataConclusao.mes = "07";
			break;
		}
		case "Agosto":{
			dataConclusao.mes = "08";
			break;
		}
		case "Setembro":{
			dataConclusao.mes = "09";
			break;
		}
		case "Outubro":{
			dataConclusao.mes = "10";
			break;
		}
		case "Novembro":{
			dataConclusao.mes = "11";
			break;
		}
		case "Dezembro":{
			dataConclusao.mes = "12";
			break;
		}
	}
	dataConclusao.ano = $(".ano option:selected").text();


	var dataEmissao = {};
	var data = new Date();
	dataEmissao.dia = data.getDate();
	dataEmissao.mes = data.getMonth()+1;
	dataEmissao.mes = dataEmissao.mes < 10 ? "0" + dataEmissao.mes : dataEmissao ;
	dataEmissao.ano = data.getFullYear();


	$("div.selecionar_servico_modelo").each(function(){ 
		
		var servico = $(this).find("select.servico option:selected").text();
		var peca = [];
		$(this).find("select.peca option:selected").each(function(){

			peca.push($(this).text());
		});
		console.log(peca);
	});

	var mecanico1 = $("select.mecanico.1 option:selected").attr("id");
	var mecanico2 = $("select.mecanico.2 option:selected").attr("id");

	console.log("Data Conclusao: " + dataConclusao.dia+"/"+dataConclusao.mes+"/"+dataConclusao.ano+"\n"+
		  		"Data Emissao: " + dataEmissao.dia+"/"+dataEmissao.mes+"/"+dataEmissao.ano+"\n"+
		  		"mecanico 1: " + mecanico1 + "\n"+
		  		"mecanico 2: " + mecanico2);
	
	$.getJSON("../os/criar?m1=" + mecanico1 + 
						 "&m2=" + mecanico2 +
			  			 "&dc="+ dataConclusao.dia+"/"+dataConclusao.mes+"/"+dataConclusao.ano+
			  			 "&de="+ dataEmissao.dia+"/"+dataEmissao.mes+"/"+dataEmissao.ano+"\n"
		,function(data, status){	});
});