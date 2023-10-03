function ControlWeb(){

    this.mostrarAgregarUsuario = ()=>{
        
        let cadena = '<div class="form-group">';
        cadena = cadena + '<label for="nick">Name:</label>'
        cadena = cadena + '<input type="text" class="form-control" id="nick">'
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary"> Submit</button>'
        cadena = cadena + '</div>'

        $("#au").append(cadena);
        $("#btnAU").on("click", ()=>{
            //recoger el valor del input text
            // llamar al servidor usando text
        });

    }

}