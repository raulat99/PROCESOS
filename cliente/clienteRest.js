function ClienteRest() {
  this.agregarUsuario = function (nick, msgid) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      let msg ="El nick " + nick + " ya está ocupado";
      if (data.nick != -1) {
        console.log("Usuario " + nick + " ha sido registrado");
        msg = "Usuario " + nick + " ha sido registrado";
        cw.mostrarMsgId(msg, msgid)

        $.cookie("nick", nick);
      } else {
        console.log("El nick ya está ocupado");
        cw.mostrarMsgId("El nick ya está ocupado", msgid)
      }
    });
    }
    this.obtenerUsuarios = (msgid)=>{
        var cli = this;
        $.getJSON("/obtenerUsuarios", (data)=>{
            console.log(data)
            cw.mostrarMsgId(JSON.stringify(data), msgid)
        })
    } 
    this.numeroUsuarios = (msgid)=>{
      var cli = this;
      $.getJSON("/numeroUsuarios", (data)=>{
          console.log("El numero de usuarios es: " + data.res)
          cw.mostrarMsgId(data.res, msgid)
      })
      
    }
    
    this.usuarioActivo = (nick, msgid) =>{
      var cli = this;
      $.getJSON("/usuarioActivo/" + nick, (data)=>{
        if(data.res){
          let msg = "El usuario " + nick + " está activo"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }else{
          let msg = "El usuario " + nick + " no está activo"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }
      })
    }

    this.eliminarUsuario = (nick)=>{
      $.getJSON("/eliminarUsuario/" + nick, (data)=>{
        if(data.res != -1){
          console.log("El usuario " + nick + " ha sido eliminado")
        }else{
          console.log("El usuario " + nick + " no existe")
        }
      })

    }

    this.agregarUsuario2 = function (nick){
    var cli = this;
    $.ajax({
        type:'GET',
        url:'/agregarUsuario/'+nick,
        success:function(data){
        if (data.nick!=-1){
            console.log("Usuario "+nick+" ha sido registrado")
        }
        else{
            console.log("El nick " + nick + " ya está ocupado");
        }
        },
        error:function(xhr, textStatus, errorThrown){
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
        });
    } 

    this.enviarJwt = function (jwt) {
      $.ajax({
        type: "POST",
        url: "/enviarJwt",
        data: JSON.stringify({ jwt: jwt }),
        success: function (data) {
          console.log({data})
          let msg = "El nick " + data.nick + " está ocupado";
          if (data.nick != -1) {
            console.log("Usuario " + data.nick + " ha sido registrado");
            msg = "Bienvenido al sistema, " + data.nick;
            $.cookie("nick", data.nick);

            //cw.mostrarLogin() //Hay que comentar la cookie y dejar esta función
          } else {
            console.log("El nick ya está ocupado");
          }
          cw.limpiar();
          cw.mostrarMsg(msg);
        },
        error: function (xhr, textStatus, errorThrown) {
          //console.log(JSON.parse(xhr.responseText));
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        },
        contentType: "application/json",
        //dataType:'json'
      });
    };
    this.registrarUsuario = function (email, password) {
      $.ajax({
        type: "POST",
        url: "/registrarUsuario",
        data: JSON.stringify({ "email": email, "password": password }),
        success: function (data) {
          if (data.nick != -1) {
            console.log("Usuario " + data.nick + " ha sido registrado");
            //$.cookie("nick", data.nick);
            cw.limpiar();
            
            cw.mostrarMsg("Bienvenido al sistema, " + data.nick);
            //cw.mostrarLogin();
          } else {
            console.log("El nick está ocupado");
            cw.mostrarMsg("El nick " + data.nick + " está ocupado");

          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        },
        contentType: "application/json",
      });
    };
      
    this.loginUsuario = function (email, password) {
      $.ajax({
        type: "POST",
        url: "/loginUsuario",
        data: JSON.stringify({ email: email, password: password }),
        success: function (data) {
          if (data.nick != -1) {
            console.log("Usuario " + data.nick + " ha sido logueado");
            $.cookie("nick", data.nick);
            cw.mostrarMsg("Bienvenido al sistema, " + data.nick);
            cw.limpiar();
            //cw.mostrarLogin();
          } else {
            console.log("No se puede iniciar sesión");
            cw.mostrarMsg("No se puede iniciar sesión");
            cw.limpiar();
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("Status: " + textStatus);
          console.log("Error: " + errorThrown);
        },
        contentType: "application/json",
      });
    };

    this.cerrarSesion=function(){
      $.getJSON("/cerrarSesion",function(){
      console.log("Sesión cerrada");
      $.removeCookie("nick");
      })
    };
}

