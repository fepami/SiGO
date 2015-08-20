var hora;
var renavamVeiculo;
var data;

function  refreshHour(){
	$.getJSON("?d=" + data, function(res, status){

		var i;

		$(".horario").css("visibility","visible");

		for ( i in res.horas)

			$(".horario").each(function(){
			if( $(this).attr("data-hour-id") == res.horas[i].hora )
				$(this).css("visibility","hidden");
			});
	});
}

$("li.hour a").click(function(){

	$("li.hour a").each(function(){
		$(this).attr('data-selected','false');
	});

	$(this).attr('data-selected','true');
});

$("a#button_confirmacao").click(function(){
	console.log(data);
	$("li.hour a").each(function(){
		if ( $(this).attr('data-selected') == "true" ){
			hora = $(this).attr('data-hour-id');
		}
	});

	renavamVeiculo = $("#cliente_veiculo option:selected").attr("data-renavam");
	//TODO: Checar erros
	$.getJSON("criar/criar?nr=" + renavamVeiculo + "&d=" + data +
			  "&h=" + hora, function(res, status){

     		if(res != false){
     			refreshHour();
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("Agendamento criado com sucesso! <br /> Data: <b>" + res.agendamentos[0].data + "</b> das <b>" + res.agendamentos[0].hora + "</b>");
     		} else {
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao criar agendamento, por favor tente novamente!");
     		}
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


