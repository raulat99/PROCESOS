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
      cadena = cadena + '<style>#btnAU:hover {}</style>'
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
        //$('#mMsg').remove()
        let cadena ='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
    }

    this.comprobarSesion = function () {
      //let nick=localStorage.getItem("nick");
      let nick = $.cookie("nick");
      if (nick) {
        cw.mostrarMsg("Bienvenido al sistema, " + nick);
      } else {
        //cw.mostrarAgregarUsuario();
        cw.mostrarLogin();
        cw.init();
      }
    };

    this.init = function () {
      let cw = this;
      google.accounts.id.initialize({
        client_id: "277970597970-rls3ih375na1atcscg2ueesj8ufk4ooe.apps.googleusercontent.com", //prod
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

    this.limpiar = function(){
      $("#mAU").remove();
      $("#fmRegistro").remove();
      $("#fmLogin").remove();
    }

    /*this.salir=function(){
        $.removeCookie("nick");
        location.reload();
    };*/

    this.salir=function(){
      //localStorage.removeItem("nick");
      $.removeCookie("nick");
      location.reload();
      rest.cerrarSesion();
      }
      

    this.mostrarRegistro=()=>{
      if ($.cookie("nick")) {
        return true;
      }
      $("#fmRegistro").remove();
      $("#registro").load("./cliente/registro.html", ()=>{
        $("#btnRegistro").on("click", ()=>{
          let email=$("#email").val();
          let pwd = $("#pwd").val();
          if(email && pwd)
          {
              rest.registrarUsuario(email, pwd)
              console.log("Valores para el registro: "+ email + " " + pwd);
          }
      });
      });
    }

    this.mostrarLogin = ()=>{
      if ($.cookie("nick")) {
        return true;
      }
      $("#fmLogin").remove();
      $("#registro").load("./cliente/login.html", ()=>{
        $("#btnLogin").on("click", ()=>{
          let email=$("#email").val();
          let pwd = $("#pwd").val();
          if(email && pwd)
          {
              rest.loginUsuario(email, pwd)
              console.log("Valores para el login : "+ email + " " + pwd);
          }
      });
      });
    }
}
