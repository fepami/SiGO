$(".trash-btn").click(function(){
	var r = confirm("Deseja realmente cancelar o agendamento? Esta opção não tem volta!");
	if (r == true) {
	    $.getJSON("remover?id=" + $(this).attr("id"));
		$(this).parent().parent().toggle();
	}
});