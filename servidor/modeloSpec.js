const modelo = require('./modelo.js')

describe('El sistema', function () {
  let sistema
  let usr

  const usr1 = { email: 'raulat99@gmail.com', password: 'asdf', nick: 'Raul' }
  const usr2 = { email: 'usr2@test.es', password: 'usr2', nick: 'usr2' }

  beforeEach(function () {
    sistema = new modelo.Sistema(true)
  })

  it('inicialmente no hay usuarios', function () {
    const res = sistema.numeroUsuarios().res
    expect(res).toEqual(0)
  })

  it('agregar usuario', function () {
    expect(sistema.numeroUsuarios().res).toEqual(0)

    sistema.agregarUsuario({ email: usr1.email }, function (usr) {
      expect(sistema.numeroUsuarios().res).toEqual(1)

      // expect(sistema.usuarios[usr1.email].nick).toEqual("usr1");
      expect(sistema.usuarios[usr1.email].email).toEqual('raulat99@gmail.com')
      // expect(sistema.usuarios[usr1.email].password).toEqual("usr1");
    })
  })

  it('eliminar usuario', function () {
    let res = sistema.numeroUsuarios().res
    expect(res).toEqual(0)
    sistema.agregarUsuario({ email: usr1.email }, function () {
      res = sistema.numeroUsuarios().res
      expect(res).toEqual(1)
      const res2 = sistema.eliminarUsuario(usr1.email)
      res = sistema.numeroUsuarios().res
      expect(res).toEqual(0)
    })
  })

  it('usuario activo', function () {
    let res = sistema.numeroUsuarios().res
    expect(res).toEqual(0)
    sistema.agregarUsuario({ email: usr1.email }, function () {
      res = sistema.numeroUsuarios().res
      expect(res).toEqual(1)
      res = sistema.usuarioActivo(usr1.email)
      expect(res).toEqual({ res: true })
    })
  })

  it('obtener usuario', function () {
    let res = sistema.obtenerUsuarios()
    expect(Object.keys(res).length).toEqual(0)
    let res2 = sistema.numeroUsuarios().res
    expect(res2).toEqual(0)
    sistema.agregarUsuario({ email: usr1.email }, function () {
      sistema.agregarUsuario({ email: usr2.email }, function () {
        res2 = sistema.numeroUsuarios().res
        expect(res2).toEqual(2)
        res = sistema.obtenerUsuarios()
        expect(Object.keys(res).length).toEqual(2)
      })
    })
  })

  it('numero usuarios', function () {
    let res = sistema.numeroUsuarios().res
    expect(res).toEqual(0)
    sistema.agregarUsuario({ email: usr1.email }, function () {
      sistema.agregarUsuario({ email: usr2.email }, function () {
        res = sistema.numeroUsuarios().res
        expect(res).toEqual(2)
      })
    })
  })
})


/*
  beforeEach(() => {
    sistema = new modelo.Sistema(true)
    usr = { nick: 'Pepe', email: 'pepe@pepe.es' }
  })

  it('inicialmente no hay usuarios', () => {
    expect(sistema.numeroUsuarios().res).toEqual(0)
  })

  it('agregar usuario', () => {
    sistema.agregarUsuario('Pepe')
    sistema.agregarUsuario(usr)
    expect(sistema.usuarioActivo('Pepe').res).toEqual(true)
  })

  it('obtener usuarios', () => {
    sistema.agregarUsuario('Pepe')
    sistema.agregarUsuario('Paco')
    expect(sistema.numeroUsuarios().res).toEqual(2)
    expect(sistema.usuarioActivo('Pepe').res).toEqual(true)
    expect(sistema.usuarioActivo('Paco').res).toEqual(true)
  })

  it('eliminar usuario', () => {
    sistema.agregarUsuario('Pepe')
    expect(sistema.usuarioActivo('Pepe').res).toEqual(true)
    sistema.eliminarUsuario('Pepe')
    expect(sistema.usuarioActivo('Pepe').res).toEqual(false)
    expect(sistema.numeroUsuarios().res).toEqual(0)
  })

  it('usuario activo', () => {
    sistema.agregarUsuario('Pepe')
    expect(sistema.usuarioActivo('Pepe').res).toEqual(true)
  })

  it('numero usuarios', () => {
    expect(sistema.numeroUsuarios().res).toEqual(0)
    sistema.agregarUsuario('Pepe')
    expect(sistema.numeroUsuarios().res).toEqual(1)
    expect(sistema.usuarioActivo('Pepe').res).toEqual(true)
  })

  describe('Métodos que acceden a datos', function () {
    const usrTest = { email: 'test@test.es', password: '1234', nick: 'test' }

    beforeEach((done) => {
      sistema.cad.conectar(() => {
        // sistema.registrarUsuario(usrTest, (res)=>{
        // sistema.confirmarCuenta(usrTest.email, ()=>{
        done()
        // });
        // })

        // done();
      })
    })

    it('Inicio de sesión correcto', (done) => {
      sistema.loginUsuario(usrTest, (res) => {
        expect(res.email).toEqual(usrTest.email)
        expect(res.email).not.toEqual(-1)
        done()
      })
    })
    it('Inicio de sesión incorrecto', (done) => {
      const usr1 = { email: 'test@test.es', password: 'test', nick: 'test' }
      sistema.loginUsuario(usr1, (res) => {
        expect(res.email).toEqual(-1)
        done()
      })
    })
  })
})
*/
