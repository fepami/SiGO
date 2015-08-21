var numeroOs;

$('body').on('click', 'button.aprovar-os', function(e){

	numeroOs = $(this).parents("tr.os").attr("data-numero-os");
	
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

	numeroOs = $(this).parents("tr.os").attr("data-numero-os");
	
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

$('body').on('click', 'button.suspender-os', function(e){

	numeroOs = $(this).parents("tr.os").attr("data-numero-os");
});	

$('body').on('click', 'button#botao-suspender-os', function(e){

	var motivo   = $("select.motivo option:selected").attr("id");
	console.log("nos: "+ numeroOs + "\nmotivo: " + motivo)

	$('#modal-suspender-os').modal('hide');

	$.getJSON("../os/suspender?m="   + motivo +
							 "&nos=" + numeroOs, function(res, status){	
		
		$('div#container-tabela').load(document.URL +  ' table.table');

		if(res != false){
     			$("#status-message").attr({ class 	: "alert alert-success",
     										role	: "alert"
     			});
     			$("#status-message").html("OS suspensa com sucesso!");
     		} else {
     			$("#status-message").attr({ class 	: "alert alert-danger",
     										role	: "alert"
     			});
     			$("#status-message").html("Erro ao suspender OS, por favor tente novamente!");
     		}
	});		
});