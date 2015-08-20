$('a#deleteMecanico').click(function(event) {
  var id_mecanico = $(this).data('id');
  $('a#deleteMConfirm').attr('href', '/mecanico/delete/?del=' + id_mecanico);
});

$('a#alterMecanico').click(function(event) {
  var id_mecanico = $(this).data('id');
  $('#cadastro').attr('action', '/mecanico/salvar?cod=' + id_mecanico);
  $.getJSON("/mecanico?cod=" + id_mecanico , function(data, status){
  		$('#name').attr('value', data.nome);
  		$('#address').attr('value', data.end_rua);
  		$('#comp').attr('value', data.end_complemento);
  		$('#cep').attr('value', data.end_cep);
  		$('#city').attr('value', data.end_cidade);
  		$('#state').attr('value', data.end_estado);
  		$('#phone').attr('value', data.telefone_1);
  		$('#cellphone').attr('value', data.telefone_2);
  		$("#esp").val(data.especialidade);
    });
});

$('#cadastro').submit(function(event) {
  var esp = $("#esp option:selected").attr("value");
  if (esp == 0) {
    event.preventDefault();
    $("#modalAlert").attr({ class   : "alert alert-danger",
      role  : "alert"
    });
    $("#modalAlert").html("Escolha uma especialidade!");
  } 
});