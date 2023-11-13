var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

function CAD() {
  this.usuarios;

  this.actualizarUsuario=function(obj,callback){
    actualizar(this.usuarios,obj,callback);
    }
  
    function actualizar(coleccion, obj, callback) {
    coleccion.findOneAndUpdate(
      { _id: ObjectId(obj._id) },
      { $set: obj },
      { upsert: false, returnDocument: "after", projection: { email: 1 } },
      function (err, doc) {
        if (err) {
          throw err;
        } else {
          console.log("Elemento actualizado");
          //console.log(doc);
          //console.log(doc);
          callback({ email: doc.value.email });
        }
      }
    );
  }
  this.eliminarUsuario = function (objEliminar, callback) {
    eliminar(this.usuario, objEliminar, callback);
  };
  function eliminar(coleccion, { _id }, callback) {
    coleccion.deleteOne(ObjectId({ _id }), function (err, result) {
      if (!err) {
        console.log({ result, msg: "Elemento eliminado", criterio });
        callback(result);
      }
    });
  }

  function buscar(coleccion, criterio, callback) {
    coleccion.find(criterio).toArray(function (error, usuarios) {
      if (usuarios.length == 0) {
        callback(undefined);
      } else {
        callback(usuarios[0]);
      }
    });
  }

  this.buscarUsuario = function (criterio, callback) {
    buscar(this.usuarios, criterio, callback);
  };

  function buscarOCrear(coleccion, criterio, callback) {
    coleccion.findOneAndUpdate(
      criterio,
      { $set: criterio },
      { upsert: true, returnDocument: "after", projection: { email: 1 } },
      function (err, doc) {
        if (err) {
          throw err;
        } else {
          console.log("Elemento actualizado");
          console.log(doc.value.email);
          callback({ email: doc.value.email });
        }
      }
    );
  }

  this.buscarOCrearUsuario = function (usr, callback) {
    buscarOCrear(this.usuarios, usr, callback);
  };

  function insertar(coleccion, elemento, callback) {
    coleccion.insertOne(elemento, function (err, result) {
      if (err) {
        console.log("error");
      } else {
        console.log("Nuevo elemento creado");
        callback(elemento);
      }
    });
  }

  this.insertarUsuario = function (usuario, callback) {
    insertar(this.usuarios, usuario, callback);
  };

  this.conectar = async function (callback) {
    let cad = this;
    let client = new mongo(
      "mongodb+srv://usr:usr@cluster0.h7i7xcx.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const database = client.db("sistema");
    cad.usuarios = database.collection("usuarios");
    callback(database);
  };
}

module.exports.CAD = CAD;
