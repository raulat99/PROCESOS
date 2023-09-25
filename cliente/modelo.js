function Sistema(){
    this.usuarios={};
    this.agregarUsuario=function(nick){
    if(!this.usuarios[nick]){
        this.usuarios[nick]=new Usuario(nick);
        console.log("Se ha insertado el nuevo usuario con nick: " + nick)
    }
    else{
        console.log("El usuario ya está en uso")
    }
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

    this.usuarioActivo =(nick)=>{return (nick in this.usuarios)}

    this.eliminarUsuario = (nick)=>{ if(this.usuarioActivo(nick)){delete this.usuarios[nick]}}

    this.numeroUsuarios = ()=>{return Object.keys(this.usuarios).length}

}

   
function Usuario(nick){
    this.nick=nick;
}


sistema = new Sistema()
sistema.agregarUsuario("Pepe")
sistema.agregarUsuario("Ramiro")
sistema.agregarUsuario("Paco")

