const modelo = require("./modelo.js");

describe('El sistema', function() {
   let sistema;
   let usr;
   beforeEach(()=>{
      sistema=new modelo.Sistema(true)
      usr = {"nick": "Pepe", "email":"pepe@pepe.es"}
   });
  
   it('inicialmente no hay usuarios', ()=> {
    expect(sistema.numeroUsuarios().res).toEqual(0)});

    it('agregar usuario', ()=> {
      sistema.agregarUsuario("Pepe")
      sistema.agregarUsuario(usr)
      expect(sistema.usuarioActivo("Pepe").res).toEqual(true)
   });

   it('obtener usuarios', ()=>{
      sistema.agregarUsuario("Pepe")
      sistema.agregarUsuario("Paco")
      expect(sistema.numeroUsuarios().res).toEqual(2)
      expect(sistema.usuarioActivo("Pepe").res).toEqual(true)
      expect(sistema.usuarioActivo("Paco").res).toEqual(true) 
   });

   it('eliminar usuario', ()=>{
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe").res).toEqual(true)
    sistema.eliminarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe").res).toEqual(false)
    expect(sistema.numeroUsuarios().res).toEqual(0)
   })

   it('usuario activo', ()=> {
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe").res).toEqual(true)});


    it('numero usuarios', ()=> {
      expect(sistema.numeroUsuarios().res).toEqual(0);
      sistema.agregarUsuario("Pepe");
      expect(sistema.numeroUsuarios().res).toEqual(1);
      expect(sistema.usuarioActivo("Pepe").res).toEqual(true)});

      describe('Métodos que acceden a datos', function() {

         let usrTest = {"email": "test@test.es", "password": "1234", "nick":"test"}
      
         beforeEach((done)=>{
            sistema.cad.conectar(()=>{
               //sistema.registrarUsuario(usrTest, (res)=>{
                  //sistema.confirmarCuenta(usrTest.email, ()=>{
                     done();
                  //});
               //})

               //done();
            })
         })
      
         it("Inicio de sesión correcto", (done)=>{
            sistema.loginUsuario(usrTest, (res)=>{
               expect(res.email).toEqual(usrTest.email);
               expect(res.email).not.toEqual(-1);
               done();
            })
         });
         it("Inicio de sesión incorrecto", (done)=>{
            let usr1 = {"email": "test@test.es", "password": "test", "nick":"test"}
            sistema.loginUsuario(usr1, (res)=>{
               expect(res.email).toEqual(-1);
               done();
            })
         });
      });

   describe("Pruebas de las partidas",function(){
      let usr2;
      let usr3;
   
      beforeEach(function(){
        usr2={"nick":"Pepa","email":"pepa@pepa.es"};
        usr3={"nick":"Pepo","email":"pepo@pepo.es"};
        sistema.agregarUsuario(usr);
        sistema.agregarUsuario(usr2);
        sistema.agregarUsuario(usr3);
      });
   
      it("Usuarios y partidas en el sistema",function(){
        expect(sistema.numeroUsuarios()).toEqual(3);
        expect(sistema.obtenerPartidasDisponibles().length).toEqual(0);
      });
   
      xit("Crear partida",function(){

      });
   
      xit("Unir a partida",function(){

      });
   
      xit("Un usuario no puede estar dos veces",function(){

      });
   
      xit("Obtener partidas",function(){
         
      })
    });
     
});





