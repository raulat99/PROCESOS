function ClienteWS(){
    this.socket;
    this.conectar=()=>{
        this.socket=io.connect();
    }

}