const nodemailer = require('nodemailer')
const gv = require('./gestorVariables.js')
// local
// const url = 'http://localhost:3000/'
// prod
const url = 'https://arquitectura-base-procesos-s5ehr653dq-ew.a.run.app/'

/* gv.accessCLAVECORREO((clave)=>{
    options.pass=clave;
}) */
/*
gv.obtenerOptions((res)=>{
    options= res;
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: options
    })
}) */

let options = {
  user: '',
  pass: ''
}

module.exports.conectar = (callback) => {
  gv.obtenerOptions((res) => {
    options = res

    callback(res)
  })
}

module.exports.enviarEmail = async function (direccion, key, men) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: options
  })

  const result = await transporter.sendMail({
    from: 'tu-cuenta@gmail.com',
    to: direccion,
    subject: 'Confirmar cuenta',
    text: 'Pulsa aquí para confirmar cuenta',
    html: '<p>Bienvenido a Sistema</p><p><a href="' + url + 'confirmarUsuario/' + direccion + '/' + key + '">Pulsa aquí para confirmar cuenta</a></p>'
  })
  console.log(JSON.stringify(result, null, 4))
}
