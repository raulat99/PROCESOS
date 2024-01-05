const fs = require('fs')
const express = require('express')
const app = express()
const httpServer = require('http').Server(app)
const { Server } = require('socket.io')
const passport = require('passport')
const cookieSession = require('cookie-session')
const args = process.argv.slice(2)
const LocalStrategy = require('passport-local').Strategy
require('./servidor/passport-setup.js')
const modelo = require('./servidor/modelo.js')
const moduloWS = require('./servidor/servidorWS.js')
const bodyParser = require('body-parser')

// import { createClient } from '@libsql/client'
// import dotenv from 'dotenv'

let test = false
// eslint-disable-next-line no-eval
test = eval(args[0]) // test=true

const PORT = process.env.PORT || 3000

const haIniciado = function (request, response, next) {
  if (request.user) {
    next()
  } else {
    response.redirect('/')
  }
}

const ws = new moduloWS.ServidorWS()
const io = new Server()

io.listen(httpServer)
const sistema = new modelo.Sistema(test)

httpServer.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${PORT}`)
  console.log('Ctrl+C para salir')
})

ws.lanzarServidor(io, sistema)

/// ////////// TODOS LOS APP.USE ///////////////////////////////////////////////

app.use(express.static(__dirname + '/'))
app.use(
  cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
  })
)
app.use(passport.initialize())
passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    function (email, password, done) {
      sistema.loginUsuario({ email, password }, function (user) {
        // if (user.email != -1) {
        return done(null, user)
        // } else {
        // return done(-1);}
      })
    }))

app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/// ////////// TODOS LOS APP.POST ///////////////////////////////////////////////

app.post('/registrarUsuario', function (request, response) {
  sistema.registrarUsuario(request.body, function (res) {
    response.send({ email: res.email })
  })
})

app.post('/enviarJwt', function (request, response) {
  const jwt = request.body.jwt
  const user = JSON.parse(atob(jwt.split('.')[1]))
  const email = user.email
  sistema.usuarioGoogle({ email }, function (obj) {
    response.send({ email: obj.email })
  })
})

app.post('/loginUsuario', passport.authenticate('local', { failureRedirect: '/fallo', successRedirect: '/ok' }))

app.post(
  '/oneTap/callback',
  passport.authenticate('google-one-tap', { failureRedirect: '/fallo' }),
  function (req, res) {
    res.redirect('/good')
  }
)

/* app.post("/loginUsuario", (request, response) => {
  sistema.loginUsuario(request.body, (res) => {
    response.send({ email: res.email });
  });
}); */

/// ////////// TODOS LOS APP.GETS ///////////////////////////////////////////////

app.get('/ok', function (request, response) {
  response.send({ email: request.user.email })
})

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/', function (request, response) {
  const contenido = fs.readFileSync(__dirname + '/cliente/index.html')
  response.setHeader('Content-type', 'text/html')
  response.send(contenido)
})

// /good antiguo
/* app.get("/good", function(request,response){
  let email=request.user.emails[0].value;
  if (email){
  sistema.agregarUsuario(email);
  }
  //console.log(request.user.emails[0].value);
  response.cookie('email',email);
  response.redirect('/');
 }); */

app.get('/good', function (request, response) {
  const email = request.user.emails[0].value
  sistema.usuarioGoogle({ email }, function (usr) {
    response.cookie('email', usr.email)
    response.redirect('/')
  })
})

app.get('/confirmarUsuario/:email/:key', function (request, response) {
  const email = request.params.email
  const key = request.params.key
  sistema.confirmarUsuario({ email, key }, function (usr) {
    if (usr.email !== -1) {
      response.cookie('email', usr.email)
    }
    response.redirect('/')
  })
})

app.get('/cerrarSesion', haIniciado, function (request, response) {
  const email = request.user.email
  request.logout()
  response.redirect('/')
  if (email) {
    sistema.eliminarUsuario(email)
  }
})

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/fallo' }),
  function (req, res) {
    res.redirect('/good')
  }
)

app.get('/fallo', function (request, response) {
  response.send({ email: '-1' })
})

app.get('/cerrarSesion', haIniciado, function (request, response) {
  const email = request.user.email
  request.logout()
  response.redirect('/')
  if (email) {
    sistema.eliminarUsuario(email)
  }
})

// app.get("/agregarUsuario/:email", haIniciado, function (request, response) {
//   let email = request.params.email;
//   let res = sistema.agregarUsuario(email);
//   response.send(res);
// });

app.get('/obtenerUsuarios', haIniciado, function (request, response) {
  const res = sistema.obtenerUsuarios()
  response.send(res)
})

app.get('/usuarioActivo/:email', haIniciado, function (request, response) {
  const email = request.params.email
  const res = sistema.usuarioActivo(email)
  response.send(res)
})

app.get('/numeroUsuarios', haIniciado, function (request, response) {
  const res = sistema.numeroUsuarios()
  response.send(res)
})

app.get('/eliminarUsuario/:email', haIniciado, function (request, response) {
  const email = request.params.email
  const res = sistema.eliminarUsuario(email)
  response.send(res)
})
