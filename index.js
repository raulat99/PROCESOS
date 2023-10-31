const fs = require("fs");
const express = require("express");
const app = express();
const passport=require("passport");
const cookieSession = require("cookie-session");
const args = process.argv.slice(2); 
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");
const bodyParser=require("body-parser");
let test=false; 
test=eval(args[0]); //test=true
app.use(express.static(__dirname + "/"));
app.use(cookieSession({
  name: 'Sistema',
  keys: ['key1', 'key2']
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let sistema = new modelo.Sistema(test);

app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));

app.get("/", function (request, response) {
  var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});
app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${PORT}`);
  console.log("Ctrl+C para salir");
});

 app.post("/registrarUsuario", function (request, response) {
   sistema.registrarUsuario(request.body, function (res) {
     response.send({ nick: res.email });
   });
 });

 app.post("/enviarJwt", function (request, response) {
   let jwt = request.body.jwt;
   let user = JSON.parse(atob(jwt.split(".")[1]));
   let email = user.email;
   sistema.usuarioGoogle({ email: email }, function (obj) {
     response.send({ nick: obj.email });
   });
 });

 app.post("/loginUsuario", (request, response)=>{
  sistema.loginUsuario(request.body, (res)=>{
    response.send({"nick": res.email});
  })
 })

// /good antiguo
/*app.get("/good", function(request,response){
  let nick=request.user.emails[0].value;
  if (nick){
  sistema.agregarUsuario(nick);
  }
  //console.log(request.user.emails[0].value);
  response.cookie('nick',nick);
  response.redirect('/');
 });*/

 app.get("/good", function(request,response){
  let email=request.user.emails[0].value;
  sistema.usuarioGoogle({"email": email},function(usr){
  response.cookie('nick',usr.email);
  response.redirect('/');
  });
  });
  


app.get('/google/callback',
 passport.authenticate('google', { failureRedirect: '/fallo' }),
 function(req, res) {
 res.redirect('/good');
});

app.get("/fallo",function(request,response){
  response.send({nick:"nook"})
});

app.get("/agregarUsuario/:nick",function(request,response){
  let nick=request.params.nick;
  let res=sistema.agregarUsuario(nick);
  response.send(res);
  });

app.get("/obtenerUsuarios",function(request,response){
  let res=sistema.obtenerUsuarios();
  response.send(res);
  });

app.get("/usuarioActivo/:nick",function(request,response){
  let nick=request.params.nick;
  let res=sistema.usuarioActivo(nick);
  response.send(res);
  });

app.get("/numeroUsuarios",function(request,response){
  let res=sistema.numeroUsuarios();
  response.send(res);
  });

  app.get("/eliminarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.eliminarUsuario(nick);
    response.send(res);
    });

