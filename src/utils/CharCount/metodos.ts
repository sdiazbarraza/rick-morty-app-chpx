var query = require("../../services/querys");
var paginas = require("../../services/paginas");
var texto = require("../txt");
const obtenerData = (data,entidad) =>{
    let cantidadDeLetras = 0;
    for (var key in data) {
      var currentArray = data[key];
        for(var i = 0; i < currentArray.results.length; i += 1) {
          cantidadDeLetras+= texto.countCharacter(currentArray.results[i].name,entidad.letra);
        }
    }
    console.log(cantidadDeLetras,`caracteres ${entidad.letra}  en total en ${entidad.entidad}`);
  }
const obtenerOcurrencia = (data,entidad) =>{
    entidad.cantidadPaginas = data[`_${entidad.entidad}`].info.pages;
    let queryFilterLocations = query.crearQueryFilter(entidad.entidad, entidad.cantidadPaginas,entidad.filter,entidad.results);
    query.ejecutar(queryFilterLocations).then((data)=>{obtenerData(data,entidad)});
  }
module.exports.obtenerOcurrencia=obtenerOcurrencia;
