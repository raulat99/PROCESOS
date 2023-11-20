
function ServidorWS(){
    this.lanzarServidor = (io)=>{
        io.on("connection", (socket)=>{
            console.log("Capa WS activa")
        })
    }
}

module.exports.ServidorWS = ServidorWS;



