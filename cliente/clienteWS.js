/* eslint-disable camelcase */
function ClienteWS () {
  this.conectar = () => {
    this.socket = io(
      {
        auth: {
          serverOffset: 0,
          username: $.cookie('email')
        }
      }
    ).connect()
    this.lanzarServidorWS()
  }

  this.crearChat = ({ nombre, codigo_invitacion, url_imagen }) => {
    console.log({ message: 'ClienteWS.crearChat()', nombre, codigo_invitacion, url_imagen })
    this.socket.emit('crearChat', { usuario: this.email, nombre, codigo_invitacion, url_imagen })
  }

  this.crearMensaje = ({ contenido_mensaje, chat_id, fecha_creacion }) => {
    console.log({ message: 'ClienteWS.crearMensaje()', contenido_mensaje, chat_id, fecha_creacion })
    this.socket.emit('crearMensaje', { contenido_mensaje, usuario: this.email, chat_id, fecha_creacion })
  }

  this.obtenerChatsUsuario = () => {
    console.log({ message: 'ClienteWS.obtenerChatsUsuario()' })
    this.socket.emit('obtenerChatsUsuario', { usuario: this.email })
  }

  this.obtenerMensajesChatId = ({ chat_id }) => {
    console.log({ message: 'ClienteWS.obtenerMensajesChatId()', chat_id })
    this.socket.emit('obtenerMensajesChatId', { chat_id })
  }

  this.unirseChat = ({ nombre, codigo_invitacion }) => {
    console.log({ message: 'ClienteWS.unirseChat()', nombre, codigo_invitacion, usuario: this.email })
    this.socket.emit('unirseChat', { nombre, codigo_invitacion, usuario: this.email })
  }

  this.lanzarServidorWS = () => {
    const cli = this
    this.socket.on('connection', function () {
      console.log('Usuario conectado al servidor de WebSockets')
    })

    this.socket.on('unirseChat', (res) => {
      console.log({ message: 'socket.on unirseChat', res })
      this.obtenerChatsUsuario()
      // cw.mostrarChatList(res)
    })

    this.socket.on('crearChat', (res) => {
      console.log({ message: 'socket.on crearChat', res })
      this.obtenerChatsUsuario()
      // cw.mostrarChatList(res)
    })

    this.socket.on('crearMensaje', (res) => {
      console.log({ message: 'socket.on crearMensaje', res })
      cw.mostrarNuevoMensajeChat(res[0])
    })

    this.socket.on('obtenerChatsUsuario', (res) => {
      console.log({ message: 'socket.on obtenerChatsUsuario', res })
      cw.mostrarChatList(res)
    })

    this.socket.on('obtenerMensajesChatId', (res) => {
      console.log({ message: 'socket.on obtenerMensajesChatId', res })
      cw.mostrarMensajesChat(res)
    })

    // this.socket.on('chatMessage', (msg, serverOffset, username) => {
    //  cw.mostrarNuevoMensajeChat(msg, serverOffset, username)
    // })

    this.socket.on('unidoAPartida', (datos) => {
      console.log(datos.codigo)
    })
    this.socket.on('partidaCreada', (datos) => {
      console.log(datos.codigo)
      ws.codigo = datos.codigo
      // cw mostrar esperando rival
    })
    this.socket.on('listaPartidas', (lista) => {
      console.log(lista)
      // cw mostrarListaPartidas
    })
  }

  this.enviarMensajeChat = ({ message }) => {
    this.socket.emit('chatMessage', message)
  }

  this.crearPartida = () => {
    this.socket.emit('crearPartida', { email: this.email })
  }

  this.unirAPartida = (codigo) => {
    this.socket.emit('unirAPartida',
      {
        email: this.email,
        codigo
      })
  }
}
