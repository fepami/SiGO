$('#pass, #pass_confirm').on('keyup', function () {
    if ($('#pass').val() == $('#pass_confirm').val()) {
      $('#message').html('').css('color', 'red');
    } else { 
      $('#message').html('Senhas não correspondem').css('color', 'red');
    }
});

$('input#confirmar_cadastro').click(function(){
  var nome_usuario = document.getElementById("user").value;
  $("#alert").hide();
  $.getJSON("/cadastro/verifica?n=" + nome_usuario, function(data, status){
    if (data != undefined) {
      $("#alert").show();
      $("#alert").attr({ class   : "alert alert-danger",
        role  : "alert"
      });
      $("#alert").html("Este usuário já existe, por favor escolha outro");
    }
  });
});