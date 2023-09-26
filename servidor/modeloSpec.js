const modelo = require("./modelo.js");

describe('El sistema', function() {
   let sistema;
  
   beforeEach(()=>{sistema=new modelo.Sistema()});
  
   it('inicialmente no hay usuarios', ()=> {
    expect(sistema.numeroUsuarios()).toEqual(0)});

    it('agregar usuario', ()=> {
      sistema.agregarUsuario("Pepe")
      expect(sistema.usuarioActivo("Pepe")).toEqual(true)});

   it('obtener usuarios', ()=>{
      sistema.agregarUsuario("Pepe")
      sistema.agregarUsuario("Paco")
      expect(sistema.numeroUsuarios()).toEqual(2)
      expect(sistema.usuarioActivo("Pepe")).toEqual(true)
      expect(sistema.usuarioActivo("Paco")).toEqual(true) 
   });

   it('eliminar usuario', ()=>{
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toEqual(true)
    sistema.eliminarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toEqual(false)
    expect(sistema.numeroUsuarios()).toEqual(0)
   })

   it('usuario activo', ()=> {
    sistema.agregarUsuario("Pepe")
    expect(sistema.usuarioActivo("Pepe")).toEqual(true)});


    it('TEST CARLOS', ()=> {
      expect(sistema.numeroUsuarios()).toEqual(0);
      sistema.agregarUsuario("Pepe");
      expect(sistema.numeroUsuarios()).toEqual(1);
      expect(sistema.usuarioActivo("Pepe")).toEqual(true)});

});


