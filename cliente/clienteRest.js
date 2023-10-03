function ClienteRest() {
  this.agregarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      if (data.nick != -1) {
        console.log("Usuario " + nick + " ha sido registrado");
      } else {
        console.log("El nick ya está ocupado");
      }
    });
    }
    this.obtenerUsuarios = ()=>{
        var cli = this;
        $.getJSON("/obtenerUsuarios", (data)=>{
            console.log(data)
        })
    } 
    this.numeroUsuarios = ()=>{
      var cli = this;
      $.getJSON("/numeroUsuarios", (data)=>{
          console.log("El numero de usuarios es: " + data.res)
      })
    }
    
    this.usuarioActivo = (nick) =>{
      var cli = this;
      $.getJSON("/usuarioActivo/" + nick, (data)=>{
        if(data.res){
          console.log("El usuario " + nick + " está activo")
        }else{
          console.log("El usuario " + nick + " no está activo")
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
}

