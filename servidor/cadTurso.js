/* eslint-disable camelcase */
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

    /* await this.db.execute(`
       CREATE TABLE  IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT);
    `) */

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS mensajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contenido_mensaje TEXT NOT NULL,
        usuario TEXT NOT NULL, 
        chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE,
        fecha_creacion DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`)

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS chats (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          codigo_invitacion TEXT NOT NULL,
          url_imagen TEXT NOT NULL,
          unique(nombre)
      );`)

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS chatUsuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL,
        chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE,
        unique(usuario, chat_id)
      );`)

    callback()
  }

  this.crearChat = function (obj, callback) {
    const db = this.db
    const result = crearChat(obj.usuario, obj.nombre, obj.codigo_invitacion, obj.url_imagen, db)
  }

  async function crearChat (usuario, nombre, codigo_invitacion, url_imagen, db) {
    let result, result2
    let id
    try {
      result = await db.execute({
        sql: 'INSERT INTO chats (nombre, codigo_invitacion, url_imagen) VALUES (:nombre, :codigo_invitacion, :url_imagen)',
        args: { nombre, codigo_invitacion, url_imagen }
      })

      id = result.lastInsertRowid.toString()

      result2 = await db.execute({
        sql: 'INSERT INTO chatUsuario (usuario, chat_id) VALUES (:usuario, :id)',
        args: { usuario, id }
      })
    } catch (e) {
      console.error(e)
      return -1
    }

    return result.lastInsertRowid.toString()
  }

  this.crearMensaje = function (obj, callback) {
    const db = this.db
    const result = crearMensaje(obj.contenido_mensaje, obj.usuario, obj.chat_id, obj.fecha_creacion, db)
    result.then(callback)
  }

  async function crearMensaje (contenido_mensaje, usuario, chat_id, fecha_creacion, db) {
    let resultInsert, result
    try {
      resultInsert = await db.execute({
        sql: 'INSERT INTO mensajes (contenido_mensaje, usuario, chat_id, fecha_creacion) VALUES (:contenido_mensaje, :usuario, :chat_id, :fecha_creacion)',
        args: { contenido_mensaje, usuario, chat_id, fecha_creacion }
      })

      const idInserted = resultInsert.lastInsertRowid

      result = await db.execute({
        sql: 'SELECT * FROM mensajes WHERE id = :idInserted',
        args: { idInserted }
      })
    } catch (e) {
      console.error(e)
      return -1
    }
    return result.rows
  }

  this.obtenerChatsUsuario = function (obj, callback) {
    const db = this.db

    const result = obtenerChatsUsuario(obj.usuario, db)
    result.then(callback)
  }

  async function obtenerChatsUsuario (usuario, db) {
    await db.sync()
    let result
    try {
      result = await db.execute({
        sql: 'SELECT chats.id, chats.nombre, chats.url_imagen FROM chats, chatUsuario WHERE chats.id = chatUsuario.chat_id AND chatUsuario.usuario = :usuario',
        args: { usuario }
      })
    } catch (e) {
      console.error(e)
      return -1
    }
    return result.rows
  }

  this.obtenerMensajesChatId = function (obj, callback) {
    const db = this.db
    const result = obtenerMensajesChatId(obj.chat_id, db)
    result.then(callback)
  }

  async function obtenerMensajesChatId (chat_id, db) {
    let result

    try {
      result = await db.execute({
        sql: 'SELECT * FROM mensajes WHERE mensajes.chat_id = :chat_id',
        args: { chat_id }
      })
    } catch (e) {
      console.error(e)
      return -1
    }
    return result.rows
  }

  this.unirseChat = function (obj, callback) {
    const db = this.db
    const result = unirseChat(obj.nombre, obj.usuario, obj.codigo_invitacion, db)
  }

  async function unirseChat (nombre, usuario, codigo_invitacion, db) {
    let result
    try {
      result = await db.execute({
        sql: 'INSERT INTO chatUsuario (usuario, chat_id) VALUES (:usuario, (SELECT id FROM chats WHERE nombre = :nombre AND codigo_invitacion = :codigo_invitacion))',
        args: { nombre, usuario, codigo_invitacion }
      })
    } catch (e) {
      if (e.message.includes('UNIQUE constraint failed')) {
        console.error('Error: Ya existe un registro con la misma combinación de usuario y chat_id')
        return -1
      } else {
        console.error('Error al insertar en la base de datos:', e.message)
        return -1
      }
    }
    return result
  }

  this.eliminarChat = function (obj, callback) {
    const db = this.db
    const result = eliminarChat(obj.nombre, db)
    result.then(callback)
  }

  async function eliminarChat (nombre, db) {
    let result
    try {
      result = await db.execute({
        sql: 'DELETE FROM chats WHERE chats.nombre = :nombre',
        args: { nombre }
      })
    } catch (e) {
      console.error(e.message)
      return -1
    }
    return result
  }

  this.eliminarmeDelChat = function (obj, callback) {
    const db = this.db
    console.log('ELIMINARME DEL CHAT')
    const result = eliminarmeDelChat(obj.nombre, obj.usuario, db)

    result.then(callback)
  }

  async function eliminarmeDelChat (nombre, usuario, db) {
    let result
    try {
      result = await db.execute({
        sql: 'DELETE FROM chatUsuario WHERE chatUsuario.usuario = :usuario AND chatUsuario.chat_id = (SELECT id FROM chats WHERE chats.nombre = :nombre)',
        args: { nombre, usuario }
      })
    } catch (e) {
      console.error(e.message)
      return -1
    }

    console.log(result)
    return nombre
    // return result.lastInsertRowid.toString()
  }

  /* VERSIÓN ANTIGUA
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
  */
}

module.exports.CadTurso = CadTurso
