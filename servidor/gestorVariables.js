const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
const client = new SecretManagerServiceClient()

async function accessCLAVECORREO () {
  const name = 'projects/277970597970/secrets/CLAVECORREO/versions/1'
  const [version] = await client.accessSecretVersion({
    name
  })
  // console.info(`Found secret ${version.name} with state ${version.state}`);
  const datos = version.payload.data.toString('utf8')
  // console.log("Datos "+datos);
  return datos
}

async function accessGMEMAIL () {
  const name = 'projects/277970597970/secrets/CORREO/versions/1'
  const [version] = await client.accessSecretVersion({
    name
  })
  // console.info(`Found secret ${version.name} with state ${version.state}`);
  const datos = version.payload.data.toString('utf8')
  // console.log("Datos "+datos);
  return datos
}

module.exports.obtenerOptions = async (callback) => {
  const options = { user: '', pass: '' }
  const user = await accessGMEMAIL()
  const pass = await accessCLAVECORREO()

  options.user = user
  options.pass = pass

  // console.log(options)
  callback(options)
}

async function accessClientIDGoogle () {
  const name = 'projects/277970597970/secrets/ClientIDGoogleStrategy/versions/1'
  const [version] = await client.accessSecretVersion({
    name
  })
  // console.info(`Found secret ${version.name} with state ${version.state}`);
  const datos = version.payload.data.toString('utf8')
  // console.log("Datos "+datos);
  return datos
}

module.exports.obtenerClientIdGoogle = async () => {
  const id = await accessClientIDGoogle()
  return id
}

async function accessClientSecretGoogle () {
  const name = 'projects/277970597970/secrets/ClientSecretGoogle/versions/1'
  const [version] = await client.accessSecretVersion({
    name
  })
  // console.info(`Found secret ${version.name} with state ${version.state}`);
  const datos = version.payload.data.toString('utf8')
  // console.log("Datos "+datos);
  return datos
}

module.exports.obtenerClientSecretGoogle = async () => {
  const secret = await accessClientSecretGoogle()
  return secret
}

async function accessTOKENBBDD () {
  const name = 'projects/277970597970/secrets/TOKEN_BBDD_MENSAJES/versions/1'
  const [version] = await client.accessSecretVersion({
    name
  })
  // console.info(`Found secret ${version.name} with state ${version.state}`);
  const datos = version.payload.data.toString('utf8')
  // console.log("Datos "+datos);
  return datos
}

module.exports.obtenerTokenBBDD = async () => {
  const token = await accessTOKENBBDD()
  return token
}
