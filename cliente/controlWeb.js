/* eslint-disable no-undef */
function ControlWeb () {
  this.enviarMensajeChat = (value) => {
    ws.socket.emit('chatMessage', value)
  }

  this.mostrarChat = function () {
    ws.conectar()
    this.limpiarTodoDivs()
    $('#chat').load('./cliente/chat.html', () => {
      $('#form')[0].addEventListener('submit', (e) => {
        e.preventDefault()
        const value = $('#input').val()
        if (value) {
          this.enviarMensajeChat(value)
          input.value = ''
        }
      })
    }
    )
  }

  this.mostrarNuevoMensajeChat = (msg, serverOffset, username) => {
    const messages = document.getElementById('messages')
    const item = `            
      <li class="flex justify-end mb-4">
          <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              ${msg}
          </div>
          <small>${username} </small>
      </li>`
    ws.socket.auth.serverOffset = serverOffset
    messages.insertAdjacentHTML('beforeend', item)
    messages.scrollTop = messages.scrollHeight
  }

  this.mostrarMsgId = (msg, id) => {
    $(id).text(msg)
  }

  this.mostrarMsg = (msg, error) => {
    $('#mMsg').remove()
    let cadena = '<h3 id="mMsg">' + msg + '</h2>'
    if (error) {
      cadena = '<h3 id="mMsg" style="color=red;">' + msg + '</h2>'
    }
    $('#msg').append(cadena)
  }

  this.mostrarOperacionesConUsuarios = () => {
    const email = $.cookie('email')

    if (email) {
      this.limpiarTodoDivs()
      cw.mostrarMsg('Bienvenido al sistema, ' + email)
      cw.mostrarNumeroUsuarios()
      cw.mostrarUsuarioActivo()
      cw.mostrarEliminarUsuario()
      cw.mostrarObtenerUsuarios()
    } else {
      cw.mostrarLogin()
    }
  }

  this.comprobarSesion = function () {
    const email = $.cookie('email')
    if (email) {
      $('#inicioSesionNav').remove()
      $('#RegistroSesionNav').remove()
      this.mostrarChat()
    } else {
      cw.mostrarLogin()
    }
  }

  this.limpiarTodoDivs = function () {
    $('#mOU').remove()
    $('#mNU').remove()
    $('#mUA').remove()
    $('#mEU').remove()
    $('#registro').remove()
    $('#chatID').remove()
    $('#mMsg').remove()
  }

  this.salir = function () {
    $.removeCookie('email')
    location.reload()
    rest.cerrarSesion()
  }

  this.mostrarRegistro = () => {
    if ($.cookie('email')) {
      return true
    }
    $('#fmRegistro').remove()
    $('#registro').load('./cliente/registro.html', () => {
      $('#btnRegistro').on('click', () => {
        const email = $('#email').val()
        const pwd = $('#password').val()
        if (email && pwd) {
          rest.registrarUsuario(email, pwd)
        }
      })
    })
  }

  this.mostrarLogin = () => {
    if ($.cookie('email')) {
      return true
    }
    $('#fmLogin').remove()
    $('#registro').load('./cliente/login.html', () => {
      $('#btnLogin').on('click', () => {
        const email = $('#email').val()
        const pwd = $('#password').val()
        if (email && pwd) {
          rest.loginUsuario(email, pwd)
        }
      })
    })
  }

  this.mostrarModal = (msg) => {
    $('#msgModal').remove()
    const cadena = "<div id='msgModal'>" + msg + '</div>'
    $('#bModal').append(cadena)
    $('#miModal').modal()
  }

  this.mostrarObtenerUsuarios = () => {
    $('#mOU').remove()
    let cadena = '<div id="mOU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="msgOU"> Mostrar usuarios </h4> '

    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgOURespuesta">  </h5> '
    cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnOU:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#nu').append(cadena)

    $('#btnOU').on('click', () => {
      rest.obtenerUsuarios('#msgOURespuesta')
    })
  }

  this.mostrarNumeroUsuarios = () => {
    $('#mNU').remove()
    let cadena = '<div id="mNU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="msgNU"> Mostrar numero de usuarios </h4> '

    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgNURespuesta">  </h5> '
    cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnNU:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#nu').append(cadena)

    $('#btnNU').on('click', () => {
      rest.numeroUsuarios('#msgNURespuesta')
    })
  }

  this.mostrarUsuarioActivo = () => {
    $('#mUA').remove()
    let cadena = '<div id="mUA">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="MsgUA"> Mostrar usuario activo </h4>'
    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgUARespuesta">  </h5> '
    cadena = cadena + '<p><input type="text" class="form-control" id="emailUA" placeholder="introduce un email"></p>'
    cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnUA:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#ua').append(cadena)

    $('#btnUA').on('click', () => {
      const email = $('#emailUA').val()
      if (email) {
        rest.usuarioActivo(email, '#msgUARespuesta')
      }
    })
  }

  this.mostrarEliminarUsuario = () => {
    $('#mEU').remove()
    let cadena = '<div id="mEU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="MsgEU"> Eliminar usuario </h4>'
    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgEURespuesta">  </h5> '
    cadena = cadena + '<p><input type="text" class="form-control" id="emailEU" placeholder="introduce un email"></p>'
    cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnEU:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#ua').append(cadena)

    $('#btnEU').on('click', () => {
      const email = $('#emailEU').val()
      if (email) {
        rest.eliminarUsuario(email, '#msgEURespuesta')
      }
    })
  }

  // DEPRECATED
  this.init = function () {
    const cw = this
    google.accounts.id.initialize({
      client_id: '277970597970-rls3ih375na1atcscg2ueesj8ufk4ooe.apps.googleusercontent.com', // prod
      auto_select: false,
      callback: cw.handleCredentialsResponse
    })
    google.accounts.id.prompt()
  }
  // DEPRECATED
  this.handleCredentialsResponse = function (response) {
    const jwt = response.credential
    const user = JSON.parse(atob(jwt.split('.')[1]))
    console.log(user.name)
    console.log(user.email)
    console.log(user.picture)
    rest.enviarJwt(jwt)
  }

  /* this.salir=function(){
      $.removeCookie("email");
      location.reload();
  }; */

  // this.mostrarAgregarUsuario = ()=>{
  //
  //  $('#bnv').remove();
  //  $('#mAU').remove();
  //  let cadena='<div id="mAU">';
  //  cadena = cadena + '<div class="card"><div class="card-body">';
  //  cadena = cadena +'<div class="form-group">';
  //  cadena = cadena + '<h4 id="MsgAgregarUsuario"> Agrega un nuevo usuario </h4>';
  //  cadena = cadena + '<label for="email">Nick:</label>';
  //  cadena = cadena + '<p><input type="text" class="form-control" id="email" placeholder="introduce un email"></p>';
  //  cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> ';
  //
  //  cadena = cadena + '<h5 id="msgAURespuesta">  </h5> ';
  //
  //  cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
  //  cadena = cadena + '<style>#btnAU:hover {}</style>'
  //  cadena = cadena + '</div>';
  //  cadena = cadena + '</div></div></div>';

  //    $("#au").append(cadena);

  //    $("#btnAU").on("click", ()=>{
  //        let email=$("#email").val();
  //        if(email)
  //        {
  //            rest.agregarUsuario(email, "#msgAURespuesta")
  //        }
  //    });
  // }
}
