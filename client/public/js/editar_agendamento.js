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

	$("li.hour a").each(function(){
		if ( $(this).attr('data-selected') == "true" ){
			hora = $(this).attr('data-hour-id');
		}
	});

	renavamVeiculo = $("#cliente_veiculo option:selected").attr("data-renavam");
	//TODO: Checar erros
	$.getJSON("editar/editar?id=" + $(".id-agendamento").attr("id") + "&d=" + data + "&h=" + hora, function(res, status){
			console.log(res);
			if(res != false){
     			refreshHour();
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("Agendamento modificado com sucesso! <br /> Nova data: <b>" + res.agendamentos[0].data + "</b> das <b>" + res.agendamentos[0].hora + "</b>");
     		} else {
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao modificar agendamento, por favor tente novamente!");
     		}
	});
});

$(".change-month span").click(function(){

	$(".change-month").toggle();
});
