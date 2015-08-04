$('#pass, #pass_confirm').on('keyup', function () {
    if ($('#pass').val() == $('#pass_confirm').val()) {
      $('#message').html('').css('color', 'red');
    } else { 
      $('#message').html('Senhas não correspondem').css('color', 'red');
    }
});

$('input#user').blur(function(){
  var nome_usuario = document.getElementById("user").value;
  $("#alert").hide();
  if (nome_usuario != "") {
    $.getJSON("/cadastro/verifica?n=" + nome_usuario, function(data, status){
      $("#alert").show();
      if (data.user != undefined) {
        $("#alert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#alert").html("Este usuário já existe! Por favor, escolha outro.");
      } else {
        $("#alert").attr({ class   : "alert alert-success",
          role  : "alert"
        });
        $("#alert").html("Usuário disponível!");
      }
    });
  }
});