$('body').on('click', 'button.aprovar-os', function(e){

	var numeroOs = $(this).parents("tr.os").attr("data-numero-os");
	
	$.getJSON("../os/autorizar?nos=" + numeroOs, function(res, status){	
		
		$('div#container-tabela').load(document.URL +  ' table.table');

		if(res != false){
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("OS autorizada com sucesso!");
     		} else {
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao autorizar OS, por favor tente novamente!");
     		}
	});		
});

$('body').on('click', 'button.finalizar-os', function(e){

	var numeroOs = $(this).parents("tr.os").attr("data-numero-os");
	
	$.getJSON("../os/finalizar?nos=" + numeroOs, function(res, status){	
		
		$('div#container-tabela').load(document.URL +  ' table.table');

		if(res != false){
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("OS finalizada com sucesso!");
     		} else {
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao finalizar OS, por favor tente novamente!");
     		}
	});		
});