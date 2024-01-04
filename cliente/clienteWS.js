function ClienteWS () {
  this.socket
  this.email
  this.codigo

  this.conectar = () => {
    this.socket = io.connect()
    this.lanzarServidorWS()
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

  this.lanzarServidorWS = () => {
    const cli = this
    this.socket.on('connect', function () {
      console.log('Usuario conectado al servidor de WebSockets')
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
}
