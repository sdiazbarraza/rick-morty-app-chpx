var query = require("../../services/querys");
var paginas = require("../../services/paginas");
var texto = require("../txt");
export{}
const obtenerData = (data,entidad) =>{
    let episodes = [];
    for (var key in data) {
      var currentArray = data[key];
        for(var i = 0; i < currentArray.results.length; i += 1) {
          let origenes =currentArray.results[i].characters.map(location=>{
            return location.origin.name ;
          });
          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
         let origenesUnique = origenes.filter(onlyUnique);
          episodes.push({
            'episodes':currentArray.results[i].name,
            'origin':origenesUnique,
            'cantidad':origenesUnique.length
          })
        }
    }
    console.log("episodes",episodes);
   
  }

const obtenerListado = (data,entidad) =>{
    entidad.cantidadPaginas = data[`_${entidad.entidad}`].info.pages;
    let queryFilterLocations = query.crearQueryFilter(entidad.entidad, entidad.cantidadPaginas,entidad.filter,entidad.results);
    query.ejecutar(queryFilterLocations).then((data)=>{obtenerData(data,entidad)});
  }
module.exports.obtenerListado=obtenerListado;
