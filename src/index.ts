const _query = require("./services/querys");
const _paginas = require("./services/charCount/paginas");

const txt = require("./utils/txt");
const Cc= require("./App/CharCount");
Cc.init();
//obtenerCantidadPaginasCharCount
//CharCount
;
/*
paginas.MainPaginas();
let queryRaw ='{characters(filter: { name: "i" }) {results {  name  } }}';
query.ejecutar(queryRaw).then((data) => {
  data.characters.results.map(result=>{
    console.log(txt.countCharacter(result.name,"i"));
  });
});*/
