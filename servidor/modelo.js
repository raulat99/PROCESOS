/* eslint-disable n/no-callback-literal */
// cad = capa de acceso a datos
const datos = require('./cad.js')
const correo = require('./email.js')
const bcrypt = require('bcrypt')

function Sistema (test) {
  this.usuarios = {}
  this.partidas = []
  this.test = test
  this.cad = new datos.CAD()
  this.agregarUsuario = function (usr) {
    const res = { email: -1 }

    const email = usr.email

    if (!this.usuarios[email]) {
      this.usuarios[email] = new Usuario(usr)
      res.email = email
    } else {
      console.log('el email ' + email + ' está en uso')
    }
    return res
  }

  this.obtenerUsuarios = () => { return this.usuarios }

  this.obtenerTodosNick = () => {
    const emails = []
    for (const email in this.usuarios) {
      emails.push(email)
    }
    return emails
  }

  this.obtenerUsuarioConEmail = (email) => { return this.usuarios[email] }

  this.usuarioActivo = (email) => { return { res: (email in this.usuarios) } }

  this.eliminarUsuario = (email) => {
    if (this.usuarioActivo(email).res) {
      delete this.usuarios[email]
      return { res: email }
    } else {
      return { res: '-1' }
    }
  }

  this.numeroUsuarios = () => { return { res: Object.keys(this.usuarios).length } }

  this.obtenerOCrearUsuario = (email) => {
    this.cad.buscarOCrearUsuario(email, (res) => {
      console.log('El usuario ' + res.email + ' está registrado en el sistema')
    })
  }

  this.usuarioGoogle = function (usr, callback) {
    const modelo = this
    this.cad.buscarOCrearUsuario(usr, function (res) {
      console.log('El usuario ' + res.email + ' está registrado en el sistema')
      callback(res)
      modelo.agregarUsuario(usr)
    })
  }

  this.registrarUsuario = function (obj, callback) {
    const modelo = this
    if (!obj.email) {
      bcrypt.hash(obj.password, 10, function (_err, hash) {
        obj.password = hash
      })
    }
    this.cad.buscarUsuario({ email: obj.email }, function (usr) {
      if (!usr) {
        obj.key = Date.now().toString()
        obj.confirmada = true // false

        bcrypt.hash(obj.password, 10, function (_err, hash) {
          obj.password = hash
          console.log(obj.password)
          console.log(obj.hash)

          modelo.cad.insertarUsuario(obj, function (res) {
            callback(res)
          })

          if (!modelo.test) {
            // correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
          }

          console.log('Usuario creado, no existía previamente')
        })
      } else {
        callback({ email: -1, mensaje: 'Usuario no encontrado' })
      }
    })
  }

  this.loginUsuario = (obj, callback) => {
    const modelo = this
    console.log('Buscando usuario ' + ' ' + obj.email)
    this.cad.buscarUsuario({ email: obj.email, confirmada: true }, (usr) => {
      console.log('Usuario ' + usr.email + ' ' + usr.password + ' ' + usr.confirmada)
      if (!usr) {
        console.log(-1)
        callback({ email: -1 })
        return -1
      }

      if (usr && usr.password) {
        bcrypt.compare(obj.password, usr.password, function (err, result) {
          if (err) {
            console.error('Error al comparar contraseñas:', err)
            console.log('Error al comparar contraseñas:')
            callback({ email: -1, mensaje: 'Error al comparar contraseñas' })
          } else if (result) {
            console.log('Contraseña válida')
            callback(usr) // Contraseña válida
            modelo.agregarUsuario(usr)
          } else {
            console.log('Contraseña incorrecta')
            callback({ email: -1, mensaje: 'Contraseña incorrecta' }) // Contraseña incorrecta
          }
        })
      } else {
        console.log('Usuario no encontrado o contraseña no establecida')
        callback({
          email: -1,
          mensaje: 'Usuario no encontrado o contraseña no establecida'
        }) // Usuario no encontrado o contraseña no establecida
      }
    })
  }

  this.confirmarUsuario = function (obj, callback) {
    const modelo = this
    this.cad.buscarUsuario(
      { email: obj.email, confirmada: false, key: obj.key },
      function (usr) {
        if (usr) {
          usr.confirmada = true
          modelo.cad.actualizarUsuario(usr, function (res) {
            callback({ email: res.email }) // callback(res)
          })
        } else {
          callback({ email: -1 })
        }
      }
    )
  }

  this.obtenerCodigo = () => {
    const codigo = Math.random().toString(30).substring(2)
    console.log('Identificador devuelto: ' + codigo)
    return codigo
  }

  this.crearPartida = function (email) {
    // obtener el objeto usuario con email = “email”
    if (this.usuarios[email]) {
    // si existe, entonces:
    // obtener un código único
    // crear partida con ese código
      const partida = new Partida(this.obtenerCodigo())
      // asignar al usuario como jugador de la partida
      partida.jugadores.push(this.obtenerUsuarioConEmail(email))
      // incluir partida en la colección de partidas
      this.partidas.push(partida)
    } else {
      console.log('El email no existe')
      return -1
    }
  }

  this.unirAPartida = function (email, codigo) {
    // obtener el usuario cuyo email es “email”
    const usuario = this.obtenerUsuarioConEmail(email)
    // obtener la partida cuyo código es “codigo”
    const partida = (this.partidas.filter(partida => partida.codigo == codigo))[0]
    // si existen el usuario y la partida, entonces
    if (partida && usuario && !this.comprobarJugadorEstaEnPartida(usuario, partida)) {
      // asignar al usuario a la partida
      console.log('Existen usuario y partida')
      partida.asignarJugadorPartida(usuario)
      console.log(this.partidas)
    } else {
      // en caso contrario, mostrar un mensaje
      console.log('No se ha encontrado usuario o partida o ya es el propietario')
      return -1
    }
  }

  this.obtenerPartidasDisponibles = () => {
    // obtener solo las disponibles
    // array temporal
    const partidasTemporal = []
    const partidas = this.partidas
    // recorrer el array asociativo

    // eslint-disable-next-line array-callback-return
    partidas.map((partida) => {
      if (partida.jugadores.length < partida.maxJug) {
        // meter un JSON en el array con el propietario/creado y el código
        partidasTemporal.push(
          {
            propietario: partida.jugadores[0].email,
            codigo: partida.codigo
          }
        )
      }
    })
    console.log(partidasTemporal)
    return partidasTemporal
  }

  this.obtenerPropietarioPartida = (partida) => {
    return partida.jugadores[0]
  }

  this.comprobarJugadorEstaEnPartida = (usuario, partida) => {
    return !!partida.jugadores.find(jugador => jugador.email == usuario.email)
  }

  if (!this.test) {
    this.cad.conectar(() => {
      console.log('Conectado a Mongo Atlas')
    })

    correo.conectar((_res) => {
      console.log('Variables secretas obtenidas')
      // console.log(res)
    })
  }
}
function Usuario (usr) {
  this.nick = usr.nick
  this.email = usr.email
  this.nombre = usr.nombre
  this.password
}

function Partida (codigo) {
  this.codigo = codigo
  this.jugadores = []
  this.maxJug = 2

  this.asignarJugadorPartida = (usr) => {
    if (this.jugadores.length < this.maxJug) {
      this.jugadores.push(usr)
    } else {
      console.log('Ya ha superado el máximo de jugadores')
    }
  }
}

module.exports.Sistema = Sistema
