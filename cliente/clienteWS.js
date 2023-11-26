function ClienteWS(){
    this.socket;
    this.conectar=()=>{
        this.socket=io.connect();
        this.lanzarServidorWS();
    }
    this.lanzarServidorWS = ()=>{
        this.socket.on('connect', function(){   						
            console.log("Usuario conectado al servidor de WebSockets");
     });
    }
}