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
      //let nick=localStorage.getItem("nick");
      let nick = $.cookie("nick");
      if (nick) {
        cw.mostrarMensaje("Bienvenido al sistema, " + nick);
      } else {
        cw.mostrarAgregarUsuario();
        cw.init();
      }
    };

    this.init = function () {
      let cw = this;
      google.accounts.id.initialize({
        client_id: "277970597970-l68mbl6i3peleg3qus1i7p5o0h4b5b53.apps.googleusercontent.com", //prod
        auto_select: false,
        callback: cw.handleCredentialsResponse,
      });
      google.accounts.id.prompt();
    };

    this.handleCredentialsResponse = function (response) {
      let jwt = response.credential;
      let user = JSON.parse(atob(jwt.split(".")[1]));
      console.log(user.name);
      console.log(user.email);
      console.log(user.picture);
      rest.enviarJwt(jwt);
    }; 

    this.salir=function(){
        $.removeCookie("nick");
        location.reload();
    };


}
