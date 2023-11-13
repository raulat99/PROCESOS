function ClienteRest() {
  //this.agregarUsuario = function (email, msgid) {
  //  var cli = this;
  //  $.getJSON("/agregarUsuario/" + email, function (data) {
  //    let msg ="El email " + email + " ya está ocupado";
  //    if (data.email != -1) {
  //      console.log("Usuario " + email + " ha sido registrado");
  //      msg = "Usuario " + email + " ha sido registrado";
  //      cw.mostrarMsgId(msg, msgid)
//
  //      $.cookie("email", email);
  //    } else {
  //      console.log("El email ya está ocupado");
  //      cw.mostrarMsgId("El email ya está ocupado", msgid)
  //    }
  //  });
  //  }
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
    
    this.usuarioActivo = (email, msgid) =>{
      var cli = this;
      $.getJSON("/usuarioActivo/" + email, (data)=>{
        if(data.res){
          let msg = "El usuario " + email + " está activo"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }else{
          let msg = "El usuario " + email + " no está activo"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }
      })
    }

    this.eliminarUsuario = (email, msgid)=>{
      $.getJSON("/eliminarUsuario/" + email, (data)=>{
        if(data.res != -1){
          let msg = "El usuario " + email + " ha sido eliminado"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }else{
          let msg = "El usuario " + email + " no existe"
          console.log(msg)
          cw.mostrarMsgId(msg, msgid)
        }
      })

    }

    this.agregarUsuario2 = function (email){
    var cli = this;
    $.ajax({
        type:'GET',
        url:'/agregarUsuario/'+email,
        success:function(data){
        if (data.email!=-1){
            console.log("Usuario "+email+" ha sido registrado")
        }
        else{
            console.log("El email " + email + " ya está ocupado");
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
          let msg = "El email " + data.email + " está ocupado";
          if (data.email != -1) {
            console.log("Usuario " + data.email + " ha sido registrado");
            msg = "Bienvenido al sistema, " + data.email;
            $.cookie("email", data.email);
            //cw.mostrarAgregarUsuario();
            cw.mostrarNumeroUsuarios();
            cw.mostrarUsuarioActivo();
            cw.mostrarEliminarUsuario();
            cw.mostrarObtenerUsuarios();
            //cw.mostrarLogin() //Hay que comentar la cookie y dejar esta función
          } else {
            console.log("El email ya está ocupado", true);
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
          if (data.email != -1) {
            console.log("Usuario " + data.email + " ha sido registrado");
            //$.cookie("email", data.email);
            cw.limpiar();
            
            cw.mostrarMsg("Bienvenido al sistema, " + data.email);
            //cw.mostrarLogin();
          } else {
            console.log("El email está ocupado");
            cw.mostrarMsg("El email está ocupado", true);

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
          if (data.email != -1) {
            console.log("Usuario " + data.email + " ha sido logueado");
            $.cookie("email", data.email);
            cw.mostrarMsg("Bienvenido al sistema, " + data.email);
            cw.limpiar();
            cw.mostrarNumeroUsuarios();
            cw.mostrarUsuarioActivo();
            cw.mostrarEliminarUsuario();
            cw.mostrarObtenerUsuarios();
            //cw.mostrarLogin();
          } else {
            //cw.limpiar();
            console.log("No se puede iniciar sesión " + data.email + " " + data.password);
            cw.mostrarMsg("No se puede iniciar sesión", true);
            
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
      $.removeCookie("email");
      })
    };
}

