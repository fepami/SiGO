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

	nomeCliente = $("#cliente_nome option:selected").text();

	alert(nomeCliente + ", " + data + " as " + hora ); //todas as variaveis estao prontas para enviar a requisicao
});	

$(".change-month span").click(function(){

	$(".change-month").toggle();
});


$("#cliente_nome").change(function(){

	nomeUsuarioCliente = $("#cliente_nome option:selected").attr("data-nomeusuario").split(' ').join('+');

	$.getJSON("?nuc=" + nomeUsuarioCliente, function(data, status){
     		
     		var i;

     		$("#cliente_veiculo").html("");

			for ( i in data.veiculos)
				$("#cliente_veiculo").html(function(index,currentcontent){	

					currentcontent += '<option data-renavam="' + data.veiculos[i].renavam + '">' + data.veiculos[i].marca + " " 
											+ data.veiculos[i].modelo + " (" + data.veiculos[i].placa + ")</option>"
					return currentcontent;
				});		
    });
});