
function ServidorWS(){

    this.enviarAlRemitente=function(socket,mensaje,datos){
		socket.emit(mensaje,datos);
	}

    this.enviarATodos=function(socket,mens,datos){
    	socket.broadcast.emit(mens,datos);
    }


    this.lanzarServidor = (io, sistema)=>{
        io.on("connection", (socket)=>{
            console.log("Capa WS activa")
        })
    }
}

module.exports.ServidorWS = ServidorWS;



