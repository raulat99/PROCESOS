const nodemailer = require('nodemailer');
//local
//const url="http://localhost:3000/";
//prod
const url="https://arquitectura-base-procesos-s5ehr653dq-ew.a.run.app/"


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raulat00@gmail.com',
        pass: 'ccaq egbq pklz pgla'
    }
});

module.exports.enviarEmail=async function(direccion, key,men) {
    const result = await transporter.sendMail({
        from: 'tu-cuenta@gmail.com',
        to: direccion,
        subject: 'Confirmar cuenta',
        text: 'Pulsa aquí para confirmar cuenta',
        html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
    });
console.log(JSON.stringify(result, null, 4));
}