var hora;
var renavamVeiculo;
var data;

$("li.hour a").click(function(){

	$("li.hour a").each(function(){
		$(this).attr('data-selected','false');
	});
	
	$(this).attr('data-selected','true');
});	

$("a#button_confirmacao").click(function(){

	$("li.hour a").each(function(){
		if ( $(this).attr('data-selected') == "true" ){
			hora = $(this).attr('data-hour-id');
		}
	});

	renavamVeiculo = $("#cliente_veiculo option:selected").attr("data-renavam");

	$.getJSON("agendamento/criar?nr=" + renavamVeiculo + "&d=" + data + 
			  "&h=" + hora, function(data, status){
     		
     		var i;

			console.log(data.agendamento);
	});
});		

$(".change-month span").click(function(){

	$(".change-month").toggle();
});


$("#cliente_nome").change(function(){

	nomeUsuarioCliente = $("#cliente_nome option:selected").attr("data-nomeusuario").split(' ').join('+');

	$.getJSON("?nr=" + nomeUsuarioCliente, function(data, status){
     		
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