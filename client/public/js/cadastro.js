$('#pass, #pass_confirm').on('keyup', function () {
    if ($('#pass').val() == $('#pass_confirm').val()) {
      $('#message').html('').css('color', 'red');
    } else { 
      $('#message').html('Senhas não correspondem').css('color', 'red');
    }
});