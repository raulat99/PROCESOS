// const gestorVariables = require('./gestorVariables.js')
// const createClient = require('@libsql/client')

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
    /* const db = createClient.createClient({
      url: 'libsql://just-green-goblin-raulat99.turso.io',
      authToken: await gestorVariables.obtenerTokenBBDD()
    })

    await db.execute(`
       CREATE TABLE  IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT);
    `)
    /*
    await db.execute(
      `
      CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contenido_mensaje TEXT NOT NULL,
        chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE,
        fecha_creacion DATE NOT NULL DEFAULT CURRENT_TIMESTAMP

      CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario1 TEXT NOT NULL,
          usuario2 TEXT NOT NULL
      );
      `) */

    const srv = this
    io.on('connection', async (socket) => {
      // sistema.cadMensajes.conectar(() => {
      //   console.log('Conectado a la base de datos turso')
      // })

      console.log('Capa WS activa')

      socket.on('disconnect', () => {
        console.log('an user has disconnected')
      })

      socket.on('crearChat', async (req) => {
        sistema.crearChat(req, (res) => {
          console.log('Ya creado el chat con id: ' + res)
        })
      })

      socket.on('crearMensaje', async (req) => {
        sistema.crearMensaje(req, (res) => {
          console.log('Ya creado el mensaje con id: ' + res)
        })
      })

      socket.on('obtenerChatsUsuario', async (req) => {
        sistema.obtenerChatsUsuario(req, (res) => {
          console.log('Estos son los chats obtenidos del usuario ' + req.usuario + ' : ')
          console.log(res)
        })
      })

      socket.on('obtenerMensajesChatId', async (req) => {
        sistema.obtenerMensajesChatId(req, (res) => {
          console.log('Estos son los chats obtenidos del chat ' + req.chat_id + ' : ')
                    console.log(res)

        })
      })

      socket.on('chatMessage', async (msg) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymous'
        console.log({ username })
        /* try {
          result = await db.execute({
            sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
            args: { msg, username }
          })
        } catch (e) {
          console.error(e)
          return
        } */

        sistema.crearMensaje({ msg, username }, (res) => {
          io.emit('chatMessage', msg, res.lastInsertRowid.toString(), username)
        })
      })

      // recuperar los mensajes anteriores
      /* if (!socket.recovered) {
        /* try {
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

        sistema.recuperarMensajes({ serverOffset: socket.handshake.auth.serverOffset }, (res) => {
          res.rows.forEach(row => {
            socket.emit('chatMessage', row.content, row.id.toString(), row.user)
          })
        }) */

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
