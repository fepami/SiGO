$('#pass, #pass_confirm').on('keyup', function () {
    if ($('#pass').val() == $('#pass_confirm').val()) {
      $('#message').html('').css('color', 'red');
    } else { 
      $('#message').html('Senhas não correspondem').css('color', 'red');
    }
});

$('input#user').blur(function(){
  var nome_usuario = document.getElementById("user").value;
  if (nome_usuario != "") {
    $.getJSON("/cadastro/verifica?u=" + nome_usuario, function(data, status){
      $("#alertUser").show();
      if (data.user != undefined) {
        $("#alertUser").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#alertUser").html("Este usuário já existe! Por favor, escolha outro.");
        $("#confirmar_cadastro").hide();
      } else {
        $("#alertUser").attr({ class   : "alert alert-success",
          role  : "alert"
        });
        $("#alertUser").html("Usuário disponível!");
        $("#confirmar_cadastro").show();
      }
    });
  }
});

$('input#mail').blur(function(){
  var email = document.getElementById("mail").value;
  if (isValidEmailAddress(email)) {
    $.getJSON("/cadastro/verifica?e=" + email, function(data, status){
      $("#alertEmail").show();
      if (data.email != undefined) {
        $("#alertEmail").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#alertEmail").html("Este e-mail já está cadastrado! Por favor, escolha outro.");
        $("#confirmar_cadastro").hide();
      } else {
        $("#alertEmail").attr({ class   : "alert alert-success",
          role  : "alert"
        });
        $("#alertEmail").html("E-mail disponível!");
        $("#confirmar_cadastro").show();
      }
    });
  } else {
    $("#alertEmail").show();
    $("#alertEmail").attr({ class   : "alert alert-danger",
      role  : "alert"
    });
    $("#alertEmail").html("E-mail inválido!");
    $("#confirmar_cadastro").hide();
  }
});

function isValidEmailAddress(email) {
    var validEmail = false;
    if (email) {
        email = email.trim().toLowerCase();
        var pattern = /^[\w-']+(\.[\w-']+)*@([a-zA-Z0-9]+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        validEmail = pattern.exec(email);
    }
    return validEmail;
}