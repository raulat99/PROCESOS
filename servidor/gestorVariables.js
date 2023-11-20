const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessCLAVECORREO () {
    const name = 'projects/277970597970/secrets/CLAVECORREO/versions/1';
      const [version] = await client.accessSecretVersion({
        name: name,
      });
      //console.info(`Found secret ${version.name} with state ${version.state}`);
      const datos=version.payload.data.toString("utf8");
      //console.log("Datos "+datos);
      return datos;
}

async function accessGMEMAIL () {
  const name = 'projects/277970597970/secrets/CORREO/versions/1';
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    //console.info(`Found secret ${version.name} with state ${version.state}`);
    const datos=version.payload.data.toString("utf8");
    //console.log("Datos "+datos);
    return datos;
}


module.exports.obtenerOptions = async (callback)=>{
  let options = {user:"", pass:""};
  let user = await accessGMEMAIL();
  let pass = await accessCLAVECORREO();

  options.user = user;
  options.pass = pass;

  console.log(options)
  callback(options);
}