/* eslint-disable camelcase */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function ControlWeb () {
  this.crearChat = (nombre, codigo_invitacion, url_imagen) => {
    console.log({
      message: 'ControlWeb.crearChat()',
      nombre,
      codigo_invitacion,
      url_imagen
    })
    ws.crearChat({ nombre, codigo_invitacion, url_imagen })
  }

  this.crearMensaje = (contenido_mensaje, chat_id, fecha_creacion) => {
    console.log({
      message: 'ControlWeb.crearMensaje()',
      contenido_mensaje,
      chat_id,
      fecha_creacion
    })
    ws.crearMensaje({ contenido_mensaje, chat_id, fecha_creacion })
  }

  this.obtenerChatsUsuario = () => {
    console.log({ message: 'ControlWeb.obtenerChatsUsuario()' })
    ws.obtenerChatsUsuario()
  }

  this.obtenerMensajesChatId = (chat_id) => {
    console.log({ message: 'ControlWeb.obtenerMensajesChatId()', chat_id })
    ws.obtenerMensajesChatId({ chat_id })
  }

  this.unirseChat = (nombre, codigo_invitacion) => {
    console.log({
      message: 'ControlWeb.unirseChat()',
      nombre,
      codigo_invitacion
    })
    ws.unirseChat({ nombre, codigo_invitacion })
  }

  this.enviarMensajeChat = (value) => {
    ws.socket.emit('chatMessage', value)
  }

  this.eliminarChat = (nombre) => {
    console.log({ message: 'ControlWeb.eliminarChat()', nombre })
    ws.eliminarChat({ nombre })
  }

  this.eliminarmeDelChat = (nombre) => {
    console.log({ message: 'ControlWeb.eliminarmeDelChat()', nombre })
    ws.eliminarmeDelChat({ nombre })
  }

  this.mostrarChat = function () {
    ws.conectar()
    this.limpiarTodoDivs()
    // $.cookie('chat_id', 3)
    this.loadChatAndForm()
    this.obtenerChatsUsuario()
  }

  this.mostrarFormularioCrearUnirChat = () => {
    const chatList = document.getElementById('chatList')

    console.log({ message: 'ControlWeb.mostrarFormularioCrearUnirChat()' })
    if (!document.getElementById('modalCrearOUnirGrupo')) {
      const item = `

      <div id="modalCrearOUnirGrupo" data-modal-show="true" class="overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center flex" aria-modal="true" role="dialog">
        <div class="relative w-full max-w-2xl px-4 h-full md:h-auto">
        
        
    <div id=""  class="w-full bg-grey-500 z-50 relative align-items:center display:flex justify-content:center m-auto">
    <div class="container mx-auto py-8">
        <div class="w-96 mx-auto bg-white rounded shadow"> 
        <div class="mx-16 py-4 px-8 text-black text-xl font-bold border-b border-grey-500">Información Grupo
            </div>  
            <form name="informacion_grupo" id="informacion_grupo">
                <div class="py-4 px-8">
                    <div class="mb-4">
                        <label class="block text-grey-darker text-sm font-bold mb-2">Nombre</label>
                        <input class=" border rounded w-full py-2 px-3 text-grey-darker" type="text" name="nombre" id="nombre_grupo" value="" placeholder="Introduce el nombre">
                    </div>
                    <div class="mb-4">
                        <label class="block text-grey-darker text-sm font-bold mb-2">Código invitación</label>
                        <input class=" border rounded w-full py-2 px-3 text-grey-darker" type="text" name="codigo_invitacion" id="codigo_invitacion" value="" placeholder="Introduce el código">
                    </div>
                    <div class="mb-4">
                        <label class="block text-grey-darker text-sm font-bold mb-2">Url imagen icono</label>
                        <input class=" border rounded w-full py-2 px-3 text-grey-darker" type="text" name="url_imagen_icono" id="url_imagen_icono" value="" placeholder="Introduce la url">
                    </div>
                    <div class="mb-4 flex flex-col justify-center">
                      <div class="flex flex row justify-center">
                        <button id= "crearGrupoButton" type="click" class=" w-1/2 mb-2 mr-1 rounded-full py-1 px-10 bg-gradient-to-r from-green-400 to-blue-500 ">
                        Crear
                        </button>

                        <button id= "unirseGrupoButton" type="click" class=" w-1/2 mb-2 ml-1 rounded-full py-1 px-10 bg-gradient-to-r from-green-400 to-blue-500 ">
                        Unirse
                        </button>
                      </div>
                        <div>
                        <button id="closeButton" type="click" class=" w-full mb-2 rounded-full py-1 px-5 bg-gradient-to-r from-red-400 to-red-500 ">
                            Close
                        </button>
                        </div>
                    </div>
                </div>
            </form>

        </div>

    </div>
</div>
</div>
<div modal-backdrop="" class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
</div>
    `
      chatList.insertAdjacentHTML('afterbegin', item)

      // $('#form')[0].addEventListener('submit', (e) => {
      //
      // })

      $('#crearGrupoButton')[0].addEventListener('click', (e) => {
        e.preventDefault()
        const valueNombre = $('#nombre_grupo').val()
        const valueInvitacion = $('#codigo_invitacion').val()
        let url_imagen_icono = $('#url_imagen_icono').val()

        console.log({ MESSAGE: 'URL DADA', url: url_imagen_icono })

        if (url_imagen_icono === '') {
          url_imagen_icono = 'https://www.svgrepo.com/show/527959/user-rounded.svg'
        }

        if (valueNombre && valueInvitacion) {
          this.crearChat(valueNombre, valueInvitacion, url_imagen_icono)
        }
        chatList.firstElementChild.remove()
      })

      $('#unirseGrupoButton')[0].addEventListener('click', (e) => {
        e.preventDefault()
        const valueNombre = $('#nombre_grupo').val()
        const valueInvitacion = $('#codigo_invitacion').val()

        if (valueNombre && valueInvitacion) {
          this.unirseChat(valueNombre, valueInvitacion)
        }
        chatList.firstElementChild.remove()
      })

      $('#closeButton')[0].addEventListener('click', (e) => {
        e.preventDefault()
        chatList.firstElementChild.remove()
      })
    }
  }

  this.loadChatAndForm = () => {
    $('#chat').load('./cliente/chat.html', () => {
      $('#formChat')[0].addEventListener('submit', (e) => {
        e.preventDefault()
        const value = $('#input').val()
        if (value) {
          const date = new Date()
          const hours = date.getHours()
          const minutes = date.getMinutes()
          const formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes
          this.crearMensaje(
            value,
            $.cookie('chat_id'),
            formattedTime
          )
          // this.enviarMensajeChat(value)
          input.value = ''
        }
      })
      $('#createGroup')[0].addEventListener('click', (e) => {
        e.preventDefault()
        this.mostrarFormularioCrearUnirChat()
      })
    })
  }

  this.mostrarChatList = (res) => {
    const todosLosChats = res
    const chatList = document.getElementById('chatList')
    chatList.innerHTML = ''
    todosLosChats.map(async (chat) => {
      this.mostrarNuevoChat(chat)
    })
  }

  this.mostrarNuevoChat = (chat) => {
    const chatList = document.getElementById('chatList')
    const chatNombreId = chat.nombre.replace(/ /g, '') + chat.id

    const item = `
    <div style="word-break: break-word;" class="flex flex-row py-4 px-2 justify-center items-center border-b-2 overflow: hidden; overflow-wrap: break-word;">
    <div class="w-1/4">
      <img src=${chat.url_imagen} class="object-cover h-12 w-12 rounded-full" alt="">
    </div>
    <div class="w-full ">
    <button id=${chat.id}>
      <div class="text-lg font-semibold ">${chat.nombre}</div>
      <!--<span class="text-gray-500">Jelou</span>-->
      </button>
    </div>
      <button id=${chatNombreId} class="w-1/4  py-2 px-4 "><svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .pictogram_een{fill:#F4D6B0;} .pictogram_drie{fill:#F27261;} .pictogram_vier{fill:#E54D2E;} .st0{fill:#F8AD89;} .st1{fill:#01A59C;} .st2{fill:#0C6667;} .st3{fill:none;} </style> <g> <circle class="pictogram_vier" cx="16" cy="16" r="13"></circle> <path class="pictogram_drie" d="M16,3v26c7.18,0,13-5.82,13-13C29,8.82,23.18,3,16,3z"></path> <path class="pictogram_een" d="M16,3c7.168,0,13,5.832,13,13s-5.832,13-13,13S3,23.168,3,16S8.832,3,16,3 M16,0 C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0L16,0z M18.121,16l2.475-2.475c0.586-0.585,0.586-1.536,0-2.121 c-0.586-0.586-1.535-0.586-2.121,0L16,13.879l-2.475-2.475c-0.586-0.586-1.535-0.586-2.121,0c-0.586,0.585-0.586,1.536,0,2.121 L13.879,16l-2.475,2.475c-0.586,0.585-0.586,1.536,0,2.121c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439L16,18.121 l2.475,2.475c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439c0.586-0.585,0.586-1.536,0-2.121L18.121,16z"></path> </g> </g></svg></button>
    </div>
    `
    chatList.insertAdjacentHTML('beforeend', item)

    document.getElementById(chat.id).addEventListener('click', (e) => {
      e.preventDefault()
      $.cookie('chat_id', chat.id)
      this.obtenerMensajesChatId($.cookie('chat_id'))
    })

    document.getElementById(chatNombreId).addEventListener('click', (e) => {
      e.preventDefault()
      this.eliminarmeDelChat(chat.nombre)
    })
  }

  this.mostrarMensajesChat = async (res) => {
    const todosLosMensajes = res
    const messages = document.getElementById('messages')
    messages.innerHTML = ''
    todosLosMensajes.map(async (mensaje) => {
      this.mostrarNuevoMensajeChat(mensaje)
    })
  }

  this.mostrarNuevoMensajeChat = (mensaje) => {
    const messages = document.getElementById('messages')
    let flexJustify = 'justify-end'
    let color = 'bg-blue-400'
    let rounded = 'rounded-bl-3xl rounded-tl-3xl rounded-tr-xl'
    if (mensaje.usuario !== $.cookie('email')) {
      flexJustify = 'justify-start'
      color = 'bg-blue-700'
      rounded = 'rounded-br-3xl rounded-tr-3xl rounded-tl-xl'
    }
    const item = `
    <li class="flex ${flexJustify} flex col mb-4 ">
      <div class="flex flex-col relative mb-4 "> 
      <div class="mr-1 py-1 px-3 ${color} ${rounded} text-white" style="max-width: 400px; overflow: hidden; word-wrap: break-word;">
          <p class="px-1 py-1"> ${mensaje.contenido_mensaje} </p>
          <div class="flex justify-end">
          <small class="text-xs px-1 py-1 relative bottom-0 right-0 "> ${mensaje.fecha_creacion} </small>
          </div>
        </div>
        <div class="flex ${flexJustify}">
          <small><strong>${mensaje.usuario}</strong></small>
        </div>
      </div>
    </li>`
    // ws.socket.auth.serverOffset = serverOffset
    messages.insertAdjacentHTML('beforeend', item)
    messages.scrollTop = messages.scrollHeight
  }

  this.vaciarChat = () => {
    const messages = document.getElementById('messages')
    messages.innerHTML = ''
  }

  // this.mostrarNuevoMensajeChat = (msg, serverOffset, username) => {
  //  const messages = document.getElementById('messages')
  //  const item = `
  //    <li class="flex justify-end mb-4">
  //        <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
  //            ${msg}
  //        </div>
  //        <small>${username} </small>
  //    </li>`
  //  ws.socket.auth.serverOffset = serverOffset
  //  messages.insertAdjacentHTML('beforeend', item)
  //  messages.scrollTop = messages.scrollHeight
  // }

  this.mostrarMsgId = (msg, id) => {
    $(id).text(msg)
  }
  /*
  this.mostrarMsg = (msg, error) => {
    $('#mMsg').remove()
    let cadena = '<h3 id="mMsg">' + msg + '</h2>'
    if (error) {
      cadena = '<h3 id="mMsg" style="color=red;">' + msg + '</h2>'
    }
    $('#msg').append(cadena)
  } */

  this.mostrarMsg = (msg, error) => {
    $('#mMsg').remove()
    const claseColor = error ? 'text-red-500' : 'text-black'
    const cadena = `
        <h2 id="mMsg" class="text-lg ${claseColor} mb-4 text-center"><strong>${msg}</strong></h3>
    `
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
      ws.email = email
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
      $('#btnRegistro').on('click', (e) => {
        e.preventDefault()
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
      $('#btnLogin').on('click', (e) => {
        e.preventDefault()
        const email = $('#email').val()
        const pwd = $('#password').val()
        if (email && pwd) {
          console.log('res.loginUsuario(email, pwd)')

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

  /* this.mostrarObtenerUsuarios = () => {
    $('#mOU').remove()
    let cadena = '<div id="mOU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="msgOU"> Mostrar usuarios </h4> '

    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgOURespuesta">  </h5> '
    cadena =
      cadena +
      '<button id="btnOU" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnOU:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#ou').append(cadena)

    $('#btnOU').on('click', () => {
      rest.obtenerUsuarios('#msgOURespuesta')
    })
  } */

  this.mostrarObtenerUsuarios = () => {
    $('#mOU').remove()
    const cadena = `
        <div id="mOU">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <h4 id="msgOU" class="text-lg font-bold"> Mostrar usuarios </h4>
                    <h5 id="RespuestaTitulo" class="text-md font-semibold"> Respuesta: </h5>
                    <h5 id="msgOURespuesta" class="text-md"> </h5>
                </div>
                <div class="mb-6 text-center">
                    <button id="btnOU" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    `

    $('#ou').append(cadena)

    $('#btnOU').on('click', () => {
      rest.obtenerUsuarios('#msgOURespuesta')
    })
  }
  /*
  this.mostrarNumeroUsuarios = () => {
    $('#mNU').remove()
    let cadena = '<div id="mNU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="msgNU"> Mostrar numero de usuarios </h4> '

    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgNURespuesta">  </h5> '
    cadena =
      cadena +
      '<button id="btnNU" type="submit" class="btn btn-primary">Submit</button>'
    cadena = cadena + '<style>#btnNU:hover {}</style>'
    cadena = cadena + '</div>'
    cadena = cadena + '</div></div></div>'

    $('#nu').append(cadena)

    $('#btnNU').on('click', () => {
      rest.numeroUsuarios('#msgNURespuesta')
    })
  } */

  this.mostrarNumeroUsuarios = () => {
    $('#mNU').remove()
    const cadena = `
        <div id="mNU">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <h4 id="msgNU" class="text-lg font-bold"> Mostrar número de usuarios </h4>
                    <h5 id="RespuestaTitulo" class="text-md font-semibold"> Respuesta: </h5>
                    <h5 id="msgNURespuesta" class="text-md"> </h5>
                </div>
                <div class="mb-6 text-center">
                    <button id="btnNU" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    `

    $('#nu').append(cadena)

    $('#btnNU').on('click', () => {
      rest.numeroUsuarios('#msgNURespuesta')
    })
  }
  /*
  this.mostrarUsuarioActivo = () => {
    $('#mUA').remove()
    let cadena = '<div id="mUA">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="MsgUA"> Mostrar usuario activo </h4>'
    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgUARespuesta">  </h5> '
    cadena =
      cadena +
      '<p><input type="text" class="form-control" id="emailUA" placeholder="introduce un email"></p>'
    cadena =
      cadena +
      '<button id="btnUA" type="submit" class="btn btn-primary">Submit</button>'
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
  } */

  this.mostrarUsuarioActivo = () => {
    $('#mUA').remove()
    const cadena = `
        <div id="mUA">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <h4 id="MsgUA" class="text-lg font-bold"> Mostrar usuario activo </h4>
                    <h5 id="RespuestaTitulo" class="text-md font-semibold"> Respuesta: </h5>
                    <h5 id="msgUARespuesta" class="text-md"> </h5>
                </div>
                <div class="mb-4">
                    <input type="text" id="emailUA" placeholder="Introduce un email" class="w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 focus:outline-none focus:bg-white">
                </div>
                <div class="mb-6 text-center">
                    <button id="btnUA" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    `

    $('#ua').append(cadena)

    $('#btnUA').on('click', () => {
      const email = $('#emailUA').val()
      if (email) {
        rest.usuarioActivo(email, '#msgUARespuesta')
      }
    })
  }
  /*
  this.mostrarEliminarUsuario = () => {
    $('#mEU').remove()
    let cadena = '<div id="mEU">'
    cadena = cadena + '<div class="card"><div class="card-body">'
    cadena = cadena + '<div class="form-group">'
    cadena = cadena + '<h4 id="MsgEU"> Eliminar usuario </h4>'
    cadena = cadena + '<h5 id="RespuestaTitulo"> Respuesta: </h5> '
    cadena = cadena + '<h5 id="msgEURespuesta">  </h5> '
    cadena =
      cadena +
      '<p><input type="text" class="form-control" id="emailEU" placeholder="introduce un email"></p>'
    cadena =
      cadena +
      '<button id="btnEU" type="submit" class="btn btn-primary">Submit</button>'
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
  } */

  this.mostrarEliminarUsuario = () => {
    $('#mEU').remove()
    const cadena = `
        <div id="mEU">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <h4 id="MsgEU" class="text-lg font-bold"> Eliminar usuario </h4>
                    <h5 id="RespuestaTitulo" class="text-md font-semibold"> Respuesta: </h5>
                    <h5 id="msgEURespuesta" class="text-md"> </h5>
                </div>
                <div class="mb-4">
                    <input type="text" id="emailEU" placeholder="Introduce un email" class="w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 focus:outline-none focus:bg-white">
                </div>
                <div class="mb-6 text-center">
                    <button id="btnEU" type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    `

    $('#eu').append(cadena)

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
      client_id:
        '277970597970-rls3ih375na1atcscg2ueesj8ufk4ooe.apps.googleusercontent.com', // prod
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
