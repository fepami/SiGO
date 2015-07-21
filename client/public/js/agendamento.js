$("li.hour a").click(function(){

	$("li.hour a").each(function(){
		$(this).attr('data-selected','false');
	});
	
	$(this).attr('data-selected','true');
});	

$("a#button_confirmacao").click(function(){

	var hora;
	var nomeCliente;

	$("li.hour a").each(function(){
		if ( $(this).attr('data-selected') == "true" ){
			hora = $(this).attr('data-hour-id');
		}
	});

	nomeCliente = $("#nome_cliente option:selected").text();

	alert(nomeCliente + ", " + data + " as " + hora ); //todas as variaveis estao prontas para enviar a requisicao
});	

$(".change-month span").click(function(){

	$(".change-month").toggle();
});
