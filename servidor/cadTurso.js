const createClient = require('@libsql/client')
const gestorVariables = require('./gestorVariables.js')

function CadTurso () {
  this.db = null
  this.conectar = async function (callback) {
    this.db = createClient.createClient({
      url: 'libsql://just-green-goblin-raulat99.turso.io',
      authToken: await gestorVariables.obtenerTokenBBDD()
    })

    console.log({ event: 'CadTurso Conectado', db: this.db })

    await this.db.execute(`
       CREATE TABLE  IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT);
    `)

    callback()

    /* await db.execute(`
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
  }

  this.crearMensaje = function (obj, callback) {
    const db = this.db
    const result = crearMensaje(obj.msg, obj.username, db)
    result.then(callback)
  }

  async function crearMensaje (msg, username, db) {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
        args: { msg, username }
      })
    } catch (e) {
      console.error(e)
    }
    return result
  }

  this.recuperarMensajes = function (obj, callback) {
    const db = this.db
    const result = recuperarMensajes(obj.serverOffset, db)
    result.then(callback)
    // callback(result)
  }

  async function recuperarMensajes (serverOffset, db) {
    let result
    try {
      result = await db.execute({
        sql: 'SELECT id, content, user FROM messages WHERE id > :serverOffset',
        args: { serverOffset }
      })
    } catch (e) {
      console.error(e)
    }
    return result
  }
/*
  this.crearMensaje = function (obj, callback) {
    const result = crearMensaje(obj.contenido_mensaje, obj.chat_id, obj.fecha_creacion)

    callback(result)
  }

   async function crearMensaje (contenido_mensaje, chat_id, fecha_creacion) {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO mensajes (contenido_mensaje, chat_id, fecha_creacion) VALUES (:contenido_mensaje, :chat_id, :fecha_creacion)',
        args: { contenido_mensaje, chat_id, fecha_creacion }
      })
    } catch (e) {
      console.error(e)
    }
    return result.lastInsertRowid.toString()
  } */
}

module.exports.CadTurso = CadTurso
