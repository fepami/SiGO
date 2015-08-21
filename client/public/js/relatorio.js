$('#filter-form .input-daterange').datepicker({
	format: "dd/mm/yyyy",
	todayBtn: "linked",
	language: "pt-BR",
	todayHighlight: true
});

$('#table-container-agendamento').hide();
$('#table-container-os').hide();
$('#table-container-os-suspensa').hide();

$('#rel-form').submit(function (event) {
	event.preventDefault();
	$('#table-container-agendamento').hide();
	$('#table-container-os').hide();
	$('#table-container-os-suspensa').hide();
	var sel = $("#rel-form input[type='radio']:checked").val();
	$.getJSON("relatorio/gerar?" + $(this).serialize(), function(data, status){
		$('#table-container').find('tbody').children().remove();
		$.each(data.relatorios, function(i, item){
			if(sel == "agendamento")
    			var html = "<tr><td>" + item.ativos + "</td><td>" + item.cancelados + "</td></tr>";
    		if(sel == "os")
    			var html = "<tr><td>" + item.aguardando + "</td><td>" + item.aprovada + "</td><td>" + 
					item.finalizada + "</td><td>" + item.suspensa +"</td></tr>";
    		$('#table-container-' + sel).find('tbody').html(html);
    	});
		$('#table-container-' + sel).show();
	});
	if(sel == "os"){
		var this_sel = "os-suspensa"
		var query_string = $(this).serialize().replace("os", this_sel);
		console.log(query_string);
		$.getJSON("relatorio/gerar?" + query_string, function(data, status){
			$('#table-container').find('tbody').children().remove();
			$.each(data.relatorios, function(i, item){
				var html = "<tr><td>" + item.valor + "</td><td>" + item.prazo + "</td></tr>";
				$('#table-container-' + this_sel).find('tbody').html(html);
			});
			$('#table-container-' + this_sel).show();
		});
	}
});