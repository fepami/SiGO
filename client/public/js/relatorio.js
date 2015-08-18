$('#filter-form .input-daterange').datepicker({
	format: "dd/mm/yyyy",
	todayBtn: "linked",
	language: "pt-BR",
	todayHighlight: true
});

$('#table-container').hide();

$('#rel-form').submit(function (event) {
	event.preventDefault();
	$.getJSON("relatorio/gerar?" + $(this).serialize(), function(data, status){
		$('#table-container').find('tbody').children().remove();
		$.each(data.relatorios, function(i, item){
    		var html = "<tr><td>" + item.ativos + "</td><td>" + item.cancelados + "</td></tr>";
    		$('#table-container').find('tbody').append(html);
    	});
		$('#table-container').show();
	});
});