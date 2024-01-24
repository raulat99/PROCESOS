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

  this.crearChat = ({ nombre }) => {
    console.log({ message: 'ClienteWS.crearChat()', nombre })
    this.socket.emit('crearChat', { usuario: this.email, nombre })
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

  this.lanzarServidorWS = () => {
    const cli = this
    this.socket.on('connection', function () {
      console.log('Usuario conectado al servidor de WebSockets')
    })

    this.socket.on('crearChat', (res) => {
      console.log({ message: 'socket.on crearChat', res })
    })

    this.socket.on('crearMensaje', (res) => {
      console.log({ message: 'socket.on crearMensaje', res })
    })

    this.socket.on('obtenerChatsUsuario', (res) => {
      console.log({ message: 'socket.on obtenerChatsUsuario', res })
    })

    this.socket.on('obtenerMensajesChatId', (res) => {
      console.log({ message: 'socket.on obtenerMensajesChatId', res })
    })

    this.socket.on('chatMessage', (msg, serverOffset, username) => {
      cw.mostrarNuevoMensajeChat(msg, serverOffset, username)
    })

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
