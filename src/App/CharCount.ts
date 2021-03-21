const query = require("../services/querys");
const paginas = require("../services/charCount/paginas");
const texto = require("../utils/txt");
const metodos = ()=> {
    return {
      
      obtenerData : (data,entidad) =>{
        let cantidadDeLetras = 0;
        for (var key in data) {
          var currentArray = data[key];
            for(var i = 0; i < currentArray.results.length; i += 1) {
              cantidadDeLetras+= texto.countCharacter(currentArray.results[i].name,entidad.letra);
            }
        }
        console.log(cantidadDeLetras,`caracteres ${entidad.letra}  en total en ${entidad.entidad}`);
      },
      
      obtenerOcurrencia : (data,entidad)=>{
        entidad.cantidadPaginas = data[`_${entidad.entidad}`].info.pages;
        let queryFilterLocations = query.crearQueryFilter(entidad.entidad, entidad.cantidadPaginas,entidad.filter,entidad.results);
        query.ejecutar(queryFilterLocations).then((data)=>{metodos().obtenerData(data,entidad)});
      }
    }
}
const Init =()=>{
   const CharCount =()=>{
     let init = async()=>{
      console.time('Tiempo ejecucion');     
       const _locations ={
         cantidadPaginas : 0,
         entidad : "locations",
         filter : '{ name: "l" }',
         letra : 'l',
         results : "name"      
       
       }
       const _characters ={
        cantidadPaginas : 0,
        entidad : "characters",
        filter : '{ name: "c" }',
        results : "name",
        letra : 'c'

      }
      const _episodes ={
        cantidadPaginas : 0,
        entidad : "episodes",
        filter :  '{ name: "e" }',
        results : "name",
        letra:"e"
      }
       await paginas.obtenerCantidadPaginas(`{
        _locations:locations(filter: { name: "l" }) {
          info {
            pages
          }
        },
        _episodes:episodes(filter: { name: "e" }) {
          info {
            pages
          }
        },
        _characters:characters(filter: { name: "c" }) {
          info {
            pages
          }
        }
      }`).then((data)=>{
       //  _locations.obtenerOcurrencia(data);
        metodos().obtenerOcurrencia(data,_locations);
        metodos().obtenerOcurrencia(data,_episodes);
        metodos().obtenerOcurrencia(data,_characters);
        console.timeEnd('Tiempo ejecucion');
        })
     };
     
     init();
    }
    CharCount();
  
  }
  module.exports.init=Init;
  