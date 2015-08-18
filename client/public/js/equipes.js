$("a#button_confirmacao").click(function(){

  mecanico1 = $("#mecanico1 option:selected").attr("data-mecanico1");
  mecanico2 = $("#mecanico2 option:selected").attr("data-mecanico2");
  
  if(mecanico1 == mecanico2) {
    $("#modalAlert").show();
    $("#modalAlert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
    $("#modalAlert").html("Escolha outro mecânico!");
  } else {
    $.post("equipe?m1=" + mecanico1 + "&m2=" + mecanico2, function(data, status){
      if (status == 'success') {
        $("#modalEquipe").modal("toggle");
        location.reload();
      }
    });
  }
});