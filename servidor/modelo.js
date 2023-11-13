//cad = capa de acceso a datos
const datos = require("./cad.js");
const correo = require("./email.js")
const bcrypt = require("bcrypt")

function Sistema(test){
    this.usuarios={};
    this.test=test;
    this.cad = new datos.CAD();
    this.agregarUsuario=function(email){
        let res={"email":-1};
        if (!this.usuarios[email]){
        this.usuarios[email]=new Usuario(email);
        res.email=email;
        }
        else{
        console.log("el email "+email+" está en uso");
        }
        return res;
        }
        
    this.obtenerUsuarios=()=>{return this.usuarios}
    
    this.obtenerTodosNick=()=>{ 
        var emails=[];
        for(var email in this.usuarios){
            emails.push(email);
        }
        return emails;    
    }

    this.obtenerUsuarioConNick = (email)=>{return this.usuarios[email]}

    this.usuarioActivo =(email)=>{return {res: (email in this.usuarios)}}

    this.eliminarUsuario = (email)=>{ 
        if(this.usuarioActivo(email).res){
            delete this.usuarios[email];
            return {res: email}
        }else {
            return {res: "-1"}
        }
    }

    this.numeroUsuarios = ()=>{return {res: Object.keys(this.usuarios).length}}

    this.obtenerOCrearUsuario = (email)=>{
        this.cad.buscarOCrearUsuario(email,(res)=>{
            console.log("El usuario " + res.email + " está registrado en el sistema");
        })
    }

    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(res){
            console.log("El usuario " + res.email + " está registrado en el sistema");
            callback(res);
            modelo.agregarUsuario(usr)
        });
        }
        
    this.registrarUsuario = function (obj, callback) {
      let modelo = this;
      if (!obj.email) {
        bcrypt.hash(obj.password, 10, function(err, hash) {
            obj.password = hash        
        });    
      }
      this.cad.buscarUsuario({ email: obj.email } , function (usr) {
        if (!usr) {
            obj.key = Date.now().toString();
            obj.confirmada = false;
            
            bcrypt.hash(obj.password, 10, function (err, hash) {
              obj.password = hash;
              console.log(obj.password);
              console.log(obj.hash);
    
              modelo.cad.insertarUsuario(obj, function (res) {
                callback(res);
              });
              
              if(!modelo.test){
                correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
              }

              console.log("Usuario creado, no existía previamente")
            });
          } else {
            callback({ email: -1, mensaje: "Usuario no encontrado" });
          }
      });
    };

    this.loginUsuario = (obj, callback) => {
      let modelo = this;
      console.log("Buscando usuario " + " " + obj.email)
      this.cad.buscarUsuario({ email: obj.email, confirmada: true }, (usr) => {
        
        //console.log("Usuario " + usr.email + " " + usr.password + " " + usr.confirmada)
        if (!usr){
          console.log(-1)
          callback({"email":-1});
          return -1;
        }
        
        if (usr && usr.password) {
          bcrypt.compare(obj.password, usr.password, function (err, result) {
            if (err) {
              console.error("Error al comparar contraseñas:", err);
              console.log("Error al comparar contraseñas:")
              callback({ email: -1, mensaje: "Error al comparar contraseñas" });
            } else if (result) {
              console.log("Contraseña válida")
              callback(usr); // Contraseña válida
              modelo.agregarUsuario(usr)
            } else {
              console.log("Contraseña incorrecta")
              callback({ email: -1, mensaje: "Contraseña incorrecta" }); // Contraseña incorrecta
            }
          });
        } else {

          console.log("Usuario no encontrado o contraseña no establecida")
          callback({
            email: -1,
            mensaje: "Usuario no encontrado o contraseña no establecida",
          }); // Usuario no encontrado o contraseña no establecida
        }
      });
    };
        
    this.confirmarUsuario = function (obj, callback) {
      let modelo = this;
      this.cad.buscarUsuario(
        { email: obj.email, confirmada: false, key: obj.key },
        function (usr) {
          if (usr) {
            usr.confirmada = true;
            modelo.cad.actualizarUsuario(usr, function (res) {
              callback({ email: res.email }); //callback(res)
            });
          } else {
            callback({ email: -1 });
          }
        }
      );
    };
        

    if(!this.test){
        this.cad.conectar(() =>{
            console.log("Conectado a Mongo Atlas");
        });
    }       
    
}

function Usuario(usr){
    this.nick=usr.nick;
    this.email=usr.email;
    this.password;

}


module.exports.Sistema=Sistema;
