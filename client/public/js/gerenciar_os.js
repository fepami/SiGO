var numeroOs;

$('body').on('click', 'button.aprovar-os', function(e){

	numeroOs = $(this).parents("tr.os").attr("data-numero-os");
	
	$.getJSON("../os/autorizar?nos=" + numeroOs, function(res, status){	
		
          $('div#container-tabela').load(document.URL +  ' table.table', function(){
               $('.os').each(function(){
                    if($(this).find('.status').html().replace(/\s/g, '') == "FINALIZADA" || $(this).find('.status').html().replace(/\s/g, '') == "SUSPENSA"){
                         $(this).find('.finalizar-os').hide();
                         $(this).find('.aprovar-os').hide();
                         $(this).find('.suspender-os').hide();
                    }else if($(this).find('.status').html().replace(/\s/g, '') == "APROVADA"){
                         $(this).find('.aprovar-os').hide();
                    }
               });
          });

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
     var that = $(this);
	
	$.getJSON("../os/finalizar?nos=" + numeroOs, function(res, status){	
		
          $('div#container-tabela').load(document.URL +  ' table.table', function(){
               $('.os').each(function(){
                    if($(this).find('.status').html().replace(/\s/g, '') == "FINALIZADA" || $(this).find('.status').html().replace(/\s/g, '') == "SUSPENSA"){
                         $(this).find('.finalizar-os').hide();
                         $(this).find('.aprovar-os').hide();
                         $(this).find('.suspender-os').hide();
                    }else if($(this).find('.status').html().replace(/\s/g, '') == "APROVADA"){
                         $(this).find('.aprovar-os').hide();
                    }
               });
          });

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

$('#form-suspender-os').submit(function(event){
     event.preventDefault();

	var motivo   = $("select.motivo option:selected").attr("id");
	console.log("nos: "+ numeroOs + "\nmotivo: " + motivo)

	$('#modal-suspender-os').modal('hide');

	$.getJSON("../os/suspender?m="   + motivo +
							 "&nos=" + numeroOs, function(res, status){	
		
		$('div#container-tabela').load(document.URL +  ' table.table', function(){
               $('.os').each(function(){
                    if($(this).find('.status').html().replace(/\s/g, '') == "FINALIZADA" || $(this).find('.status').html().replace(/\s/g, '') == "SUSPENSA"){
                         $(this).find('.finalizar-os').hide();
                         $(this).find('.aprovar-os').hide();
                         $(this).find('.suspender-os').hide();
                    }else if($(this).find('.status').html().replace(/\s/g, '') == "APROVADA"){
                         $(this).find('.aprovar-os').hide();
                    }
               });
          });

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