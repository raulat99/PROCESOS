function Sistema(){
    this.usuarios={};
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
}

   
function Usuario(nick){
    this.nick=nick;
}

module.exports.Sistema=Sistema;
