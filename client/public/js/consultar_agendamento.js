$(".trash-btn").click(function(){
	var r = confirm("Deseja realmente cancelar o agendamento? Esta opção não tem volta!");
	var agendamentoSelecionado = $(this);
	if (r == true) {
		$.getJSON("remover?id=" + $(this).attr("id"), function(data, status){
     		if(data){
     			agendamentoSelecionado.parent().parent().toggle();
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("Agendamento cancelado com sucesso!");
     		} else {
     			alert("Erro ao remover agendamento, por favor tente novamente!");
     		}
    	});
	}
});

$(".pencil-btn").click(function(){
	window.location.href = "editar?id=" + $(this).attr("id");
});