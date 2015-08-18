var novoServicoAppend;
var novaPecaAppend;
var quantidadeServico;
var quantidadePeca;

$(window).load(function(){

    novoServicoAppend = $(".selecionar_servico").html();
    novaPecaAppend    = $(".selecionar_peca_modelo").html();
});

$('body').on('change', '.selecionar_servico select', function(e){
	
	valorServico = $(this).parentsUntil(".selecionar_servico").find(".servico option:selected").attr("data-preco");
	if (valorServico == undefined || valorServico == "")
		valorServico = 0;

	var valorPecas = 0;
	$(this).parentsUntil(".selecionar_servico").find(".peca").each(function(){

		aux = $("option:selected", this).attr("data-preco");
		if (aux != undefined && aux != "")
			valorPecas += parseFloat(aux); 
	});
	novoValor = parseFloat(valorServico) + parseFloat(valorPecas);
	$(this).parentsUntil(".selecionar_servico").find("span").html(novoValor);
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
	var numeroOs;

	var mecanico1 = $("select.mecanico.1 option:selected").attr("id");
	var mecanico2 = $("select.mecanico.2 option:selected").attr("id");

	console.log("Data Conclusao: " + dataConclusao.dia+"/"+dataConclusao.mes+"/"+dataConclusao.ano+"\n"+
		  		"Data Emissao: " + dataEmissao.dia+"/"+dataEmissao.mes+"/"+dataEmissao.ano+"\n"+
		  		"mecanico 1: " + mecanico1 + "\n"+
		  		"mecanico 2: " + mecanico2);
	
	$.getJSON("../os/criar?m1=" + mecanico1 + 
						 "&m2=" + mecanico2 +
			  			 "&dc="+ dataConclusao.dia+"/"+dataConclusao.mes+"/"+dataConclusao.ano+
			  			 "&de="+ dataEmissao.dia+"/"+dataEmissao.mes+"/"+dataEmissao.ano, function(res, status){	
		
		if(res == false){
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao criar OS, por favor selecione uma equipe valida!");

     	} else {
     		$("#status-message").attr({ class 	: "alert alert-success",
     									role	: "alert"
     		});
    			$("#status-message").html("OS criada com sucesso! <br />");
    		numeroOs = res.ordemservico[0].numero_os;
     			
     		$("div.selecionar_servico_modelo").each(function(){ 
		
				var servico = $(this).find("select.servico option:selected").text();
				
				
				aux = $(this).find(".subtotal span").html();
				var valor = parseFloat(aux);

				$.getJSON("../os/criar/servico?ts="  + servico + 
					                         "&v="   + valor +
			  		 						 "&nos=" + numeroOs, function(res, status){

			  		if(res == false){
     					$("#status-message").attr({ class 	: "alert alert-danger",
     												role	: "alert"
     					});
     					$("#status-message").html("Erro ao criar OS, por favor selecione um servico valido!");

     				} else {
     					idServico = res.servico[0].id;
     					$(this).find("select.peca option:selected").each(function(){
     						var peca = $(this).text();

     						/*$.getJSON("../os/criar/peca?tp="  + peca + 
					                         		  "&is="   + idServico, function(res, status){
								
							});*/
						});
     				}
			  	});
			});
     	}
	});
});