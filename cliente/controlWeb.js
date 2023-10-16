function ControlWeb(){

    this.mostrarAgregarUsuario = ()=>{
        
      $('#bnv').remove();
      $('#mAU').remove();
      let cadena='<div id="mAU">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<label for="nick">Nick:</label>';
      cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
      cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
      cadena=cadena+'<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_pressed_web.png" style="height:40px;"></a></div>';
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

        $("#au").append(cadena);

        $("#btnAU").on("click", ()=>{
            let nick=$("#nick").val();
            if(nick)
            {
                $('#mAU').remove()
                rest.agregarUsuario(nick)
            }
        });
    }
    this.mostrarMsg=(msg)=>{
        $('#mMsg').remove()
        let cadena ='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
    }

    this.comprobarSesion = function () {
      let nick = $.cookie("nick");
      if (nick) {
        cw.mostrarMsg("Bienvenido al sistema, " + nick);
      } else {
        cw.mostrarAgregarUsuario();
      }
    };

    this.salir=function(){
        $.removeCookie("nick");
        location.reload();
    };


}
