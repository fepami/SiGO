$('a#deleteVeiculo').click(function(event) {
  var renavam = $(this).data('renavam');
  var cliente = $(this).data('cliente');
  $('a#deleteVConfirm').attr('href', '/veiculo/?u=' + cliente + '&del=' + renavam);
});
