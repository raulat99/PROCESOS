//cad = capa de acceso a datos
const datos = require("./cad.js");
const correo = require("./email.js")
const bcrypt = require("bcrypt")

function Sistema(test){
    this.usuarios={};
    this.test=test;
    this.cad = new datos.CAD();
    this.agregarUsuario=function(nick){
        let res={"nick":-1};
        if (!this.usuarios[nick]){
        this.usuarios[nick]=new Usuario(nick);
        res.nick=nick;
        }
        else{
        console.log("el nick "+nick+" está en uso");
        }
        return res;
        }
        
    this.obtenerUsuarios=()=>{return this.usuarios}
    
    this.obtenerTodosNick=()=>{ 
        var nicks=[];
        for(var nick in this.usuarios){
            nicks.push(nick);
        }
        return nicks;    
    }

    this.obtenerUsuarioConNick = (nick)=>{return this.usuarios[nick]}

    this.usuarioActivo =(nick)=>{return {res: (nick in this.usuarios)}}

    this.eliminarUsuario = (nick)=>{ 
        if(this.usuarioActivo(nick).res){
            delete this.usuarios[nick];
            return {res: nick}
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
        });
        }
        
    this.registrarUsuario = function (obj, callback) {
      let modelo = this;
      if (!obj.nick) {
        obj.nick = obj.email;
        bcrypt.hash(obj.password, 10, function(err, hash) {
            obj.password = hash        
        });    
      }
      this.cad.buscarUsuario(obj, function (usr) {
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
              console.log("Usuario creado, no existía previamente")
              correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            });
          } else {
            callback({ email: -1, mensaje: "Usuario no encontrado" });
          }
      });
    };

    this.loginUsuario = (obj, callback) => {
      this.cad.buscarUsuario({ email: obj.email, confirmada: true }, (usr) => {
        if (usr && usr.password) {
          bcrypt.compare(obj.password, usr.password, function (err, result) {
            if (err) {
              console.error("Error al comparar contraseñas:", err);
              callback({ email: -1, mensaje: "Error al comparar contraseñas" });
            } else if (result) {
              callback(usr); // Contraseña válida
            } else {
              callback({ email: -1, mensaje: "Contraseña incorrecta" }); // Contraseña incorrecta
            }
          });
        } else {
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

function Usuario(nick){
    this.nick=nick;
    this.email;
    this.password;
}


module.exports.Sistema=Sistema;
