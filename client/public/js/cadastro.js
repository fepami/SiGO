$('#pass, #pass_confirm').on('keyup', function () {
    if ($('#pass').val() == $('#pass_confirm').val()) {
      $('#message').html('').css('color', 'red');
    } else { 
      $('#message').html('Senhas não correspondem').css('color', 'red');
    }
});

$('input#confirmar_cadastro').click(function(){
  var nome_usuario = document.getElementById("user").value;
  $.getJSON("?nr=" + nome_usuario, function(res, status){
    console.log(res);
    console.log(status);
  });
});