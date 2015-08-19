$("#mecanico1").change(function(){
  $('#buttonConfirmacao').attr('href', '#');
  var mecanico1 = $("#mecanico1 option:selected").attr("data-mecanico1");
  var mecanico2 = $("#mecanico2 option:selected").attr("data-mecanico2");

  if (mecanico1 < mecanico2) {
    $.getJSON("/equipe/verifica/?m1=" + mecanico1 + '&m2=' + mecanico2, function(data, status){
      if (!data.found) {
        $('#buttonConfirmacao').attr('href', '/equipe/?m1=' + mecanico1 + '&m2=' + mecanico2);
      } else {
        $("#modalAlert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#modalAlert").html("Esta equipe já existe!");
      }
    });
  } else if (mecanico1 > mecanico2) {
    $.getJSON("/equipe/verifica/?m1=" + mecanico2 + '&m2=' + mecanico1, function(data, status){
      if (!data.found) {
        $('#buttonConfirmacao').attr('href', '/equipe/?m1=' + mecanico2 + '&m2=' + mecanico1);
      } else {
        $("#modalAlert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#modalAlert").html("Esta equipe já existe!");
      }
    });
  }
});

$("#mecanico2").change(function(){
  $('#buttonConfirmacao').attr('href', '#');
  var mecanico1 = $("#mecanico1 option:selected").attr("data-mecanico1");
  var mecanico2 = $("#mecanico2 option:selected").attr("data-mecanico2");

  if (mecanico1 < mecanico2) {
    $.getJSON("/equipe/verifica/?m1=" + mecanico1 + '&m2=' + mecanico2, function(data, status){
      if (!data.found) {
        $('#buttonConfirmacao').attr('href', '/equipe/?m1=' + mecanico1 + '&m2=' + mecanico2);
      } else {
        $("#modalAlert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#modalAlert").html("Esta equipe já existe!");
      }
    });
  } else if (mecanico1 > mecanico2) {
    $.getJSON("/equipe/verifica/?m1=" + mecanico2 + '&m2=' + mecanico1, function(data, status){
      if (!data.found) {
        $('#buttonConfirmacao').attr('href', '/equipe/?m1=' + mecanico2 + '&m2=' + mecanico1);
      } else {
        $("#modalAlert").attr({ class   : "alert alert-danger",
          role  : "alert"
        });
        $("#modalAlert").html("Esta equipe já existe!");
      }
    });
  }
});

$('#buttonConfirmacao').click(function(event) {
  var mecanico1 = $("#mecanico1 option:selected").attr("data-mecanico1");
  var mecanico2 = $("#mecanico2 option:selected").attr("data-mecanico2");

  if (mecanico1 == undefined || mecanico2 == undefined) {
    $("#modalAlert").attr({ class   : "alert alert-danger",
      role  : "alert"
    });
    $("#modalAlert").html("Escolha um mecânico!");
  } else if (mecanico1 == mecanico2) {
    $("#modalAlert").attr({ class   : "alert alert-danger",
      role  : "alert"
    });
    $("#modalAlert").html("Uma equipe deve ter dois mecânicos diferentes!");
  }
});

$('a#deleteEquipe').click(function(event) {
  var id_equipe = $(this).data('id');
  $('a#deleteEConfirm').attr('href', '/equipe/delete/?del=' + id_equipe);
});