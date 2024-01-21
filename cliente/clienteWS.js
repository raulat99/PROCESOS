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
  this.enviarMensajeChat = ({ message }) => {
    this.socket.emit('chatMessage', message)
  }

  this.lanzarServidorWS = () => {
    const cli = this
    this.socket.on('connection', function () {
      console.log('Usuario conectado al servidor de WebSockets')
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
