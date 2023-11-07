function ControlWeb(){

    this.mostrarAgregarUsuario = ()=>{
        
      $('#bnv').remove();
      $('#mAU').remove();
      let cadena='<div id="mAU">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<h4 id="MsgAgregarUsuario"> Agrega un nuevo usuario </h4>';
      cadena = cadena + '<label for="nick">Nick:</label>';
      cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
      cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
      
      cadena = cadena + '<h5 id="msgAURespuesta">  </h5> ';
      
      cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
      cadena = cadena + '<style>#btnAU:hover {}</style>'
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

        $("#au").append(cadena);

        $("#btnAU").on("click", ()=>{
            let nick=$("#nick").val();
            if(nick)
            {
                rest.agregarUsuario(nick, "#msgAURespuesta")
            }
        });
    }

    this.mostrarObtenerUsuarios = ()=>{
      $('#mOU').remove();
      let cadena='<div id="mOU">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<h4 id="msgOU"> Mostrar usuarios </h4> ';

      cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
      cadena = cadena + '<h5 id="msgOURespuesta">  </h5> ';
      cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary">Submit</button>';
      cadena = cadena + '<style>#btnOU:hover {}</style>'
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

      $("#nu").append(cadena);

      $("#btnOU").on("click", ()=>{
            rest.obtenerUsuarios("#msgOURespuesta");
    });
    }

    this.mostrarNumeroUsuarios = ()=>{
      $('#mNU').remove();
      let cadena='<div id="mNU">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<h4 id="msgNU"> Mostrar numero de usuarios </h4> ';

      cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
      cadena = cadena + '<h5 id="msgNURespuesta">  </h5> ';
      cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary">Submit</button>';
      cadena = cadena + '<style>#btnNU:hover {}</style>'
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

      $("#nu").append(cadena);

      $("#btnNU").on("click", ()=>{
            rest.numeroUsuarios("#msgNURespuesta");
    });
    }


    this.mostrarUsuarioActivo = ()=>{
      $('#mUA').remove();
      let cadena='<div id="mUA">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<h4 id="MsgUA"> Mostrar usuario activo </h4>';
      cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
      cadena = cadena + '<h5 id="msgUARespuesta">  </h5> ';
      cadena = cadena + '<p><input type="text" class="form-control" id="nickUA" placeholder="introduce un nick"></p>';
      cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">Submit</button>';
      cadena = cadena + '<style>#btnUA:hover {}</style>'
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

        $("#ua").append(cadena);

        $("#btnUA").on("click", ()=>{
            let nick=$("#nickUA").val();
            if(nick)
            {
                rest.usuarioActivo(nick,"#msgUARespuesta" )
            }
        });
    }

    this.mostrarEliminarUsuario = ()=>{
      $('#mEU').remove();
      let cadena='<div id="mEU">';
      cadena = cadena + '<div class="card"><div class="card-body">';
      cadena = cadena +'<div class="form-group">';
      cadena = cadena + '<h4 id="MsgEU"> Eliminar usuario </h4>';
      cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
      cadena = cadena + '<h5 id="msgEURespuesta">  </h5> ';
      cadena = cadena + '<p><input type="text" class="form-control" id="nickEU" placeholder="introduce un nick"></p>';
      cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Submit</button>';
      cadena = cadena + '<style>#btnEU:hover {}</style>'
      cadena = cadena + '</div>';
      cadena = cadena + '</div></div></div>';

        $("#ua").append(cadena);

        $("#btnEU").on("click", ()=>{
            let nick=$("#nickEU").val();
            if(nick)
            {
                rest.eliminarUsuario(nick,"#msgEURespuesta" )
            }
        });
    }

    this.mostrarMsgId = (msg, id)=>{
      $(id).text(msg);
    }

    this.mostrarMsg=(msg, error)=>{
      $('#mMsg').remove();
      var cadena ='<h3 id="mMsg">'+msg+'</h2>';
      if(error){
        cadena ='<h3 id="mMsg" style="color=red;">'+msg+'</h2>';
      }
        $('#msg').append(cadena);
    }

    this.comprobarSesion = function () {
      //let nick=localStorage.getItem("nick");
      let nick = $.cookie("nick");
      if (nick) {
        cw.mostrarMsg("Bienvenido al sistema, " + nick);
        cw.mostrarAgregarUsuario();
        cw.mostrarNumeroUsuarios();
        cw.mostrarUsuarioActivo();
        cw.mostrarEliminarUsuario();
        cw.mostrarObtenerUsuarios();
      } else {
        //cw.mostrarAgregarUsuario();
        cw.mostrarLogin();
        //cw.init();
      }
    };


    //DEPRECATED
    this.init = function () {
      let cw = this;
      google.accounts.id.initialize({
        client_id: "277970597970-rls3ih375na1atcscg2ueesj8ufk4ooe.apps.googleusercontent.com", //prod
        auto_select: false,
        callback: cw.handleCredentialsResponse,
      });
      google.accounts.id.prompt();
    };
    //DEPRECATED
    this.handleCredentialsResponse = function (response) {
      let jwt = response.credential;
      let user = JSON.parse(atob(jwt.split(".")[1]));
      console.log(user.name);
      console.log(user.email);
      console.log(user.picture);
      rest.enviarJwt(jwt);
    }; 

    this.limpiar = function(){
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
              //console.log("Valores para el registro: "+ email + " " + pwd);
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
              //console.log("Valores para el login : "+ email + " " + pwd);
          }
      });
      });
    }
}
