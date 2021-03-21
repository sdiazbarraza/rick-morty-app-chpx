var paginas = require("../services/paginas");
var metodosEp = require("../utils/EpisodeLo/metodos");
const EpisodeLocation =()=>{
    const init = async()=>{
     console.time('Tiempo ejecucion');     
     const _episodes ={
       cantidadPaginas : 0,
       entidad : "episodes",
       filter :  '',
       results : "name characters{origin{name}}",
       letra:"e"
     }
      await paginas.obtenerCantidadPaginas(`{_episodes:episodes(page:1) {
        info{
          count
          pages
        }
      }
       
     }`).then((data)=>{
      console.time('Tiempo ejecucion EpLocation');
      metodosEp.obtenerListado(data,_episodes)
       console.timeEnd('Tiempo ejecucion EpLocation');
       })
    };
    
    return { init : init()};
   }
   module.exports.init=EpisodeLocation().init;