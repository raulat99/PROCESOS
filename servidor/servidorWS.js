const createClient = require('@libsql/client')

function ServidorWS () {
  this.enviarAlRemitente = function (socket, mensaje, datos) {
    socket.emit(mensaje, datos)
  }
  this.enviarATodosMenosRemitente = function (socket, mens, datos) {
    socket.broadcast.emit(mens, datos)
  }
  this.enviarATodos = (io, mens, datos) => {
    io.emit(mens, datos)
  }

  this.lanzarServidor = async (io, sistema) => {
    const db = createClient.createClient({
      url: 'libsql://just-green-goblin-raulat99.turso.io',
      authToken: await require('./gestorVariables.js').obtenerTokenBBDD()
    })

    await db.execute(`
          CREATE TABLE  IF NOT EXISTS messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              content TEXT,
              user TEXT
          )
      `)

    const srv = this
    io.on('connection', async (socket) => {
      console.log('Capa WS activa')

      socket.on('disconnect', () => {
        console.log('an user has disconnected')
      })

      socket.on('chatMessage', async (msg) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymous'
        console.log({ username })
        try {
          result = await db.execute({
            sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
            args: { msg, username }
          })
        } catch (e) {
          console.error(e)
          return
        }
        io.emit('chatMessage', msg, result.lastInsertRowid.toString(), username)
      })

      // recuperar los mensajes anteriores
      if (!socket.recovered) {
        try {
          const result = await db.execute({
            sql: 'SELECT id, content, user FROM messages WHERE id > ?',
            args: [socket.handshake.auth.serverOffset ?? 0]
          })

          result.rows.forEach(row => {
            socket.emit('chatMessage', row.content, row.id.toString(), row.user)
          })
        } catch (e) {
          console.error(e)
        }
      }

      socket.on('crearPartida', (datos) => {
        const codigo = sistema.crearPartida(datos.email)
        if (codigo !== -1) {
          socket.join(codigo)
        }
        srv.enviarAlRemitente(socket, 'partidaCreada', { codigo })
        const lista = sistema.obtenerPartidasDisponibles()
        srv.enviarATodosMenosRemitente(socket, 'listaPartidas', lista)
      })

      socket.on('unirAPartida', (datos) => {
        const codigo = sistema.unirAPartida(datos.email, datos.codigo)

        if (codigo !== -1) {
          socket.join(codigo)
        }
        srv.enviarAlRemitente(socket, 'unidoAPartida', { codigo })
        const lista = sistema.obtenerPartidasDisponibles()
        srv.enviarATodosMenosRemitente(socket, 'listaPartidas', lista)
      })
    })
  }
}

module.exports.ServidorWS = ServidorWS
