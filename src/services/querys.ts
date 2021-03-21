import { request, gql } from 'graphql-request';
const baseUrl = 'https://rickandmortyapi.com/graphql';


const ejecutar = async(query):Promise<void>=>{
  
  return await request(baseUrl, gql`${query}`);
}

const crearQueryFilter = (schema:string,pages:number|1,filter:String ,results:string):String=>{

  if(pages===1){

    return `${schema}(filter: ${filter}){results {${results}}}`;

  }else{
    let queryString :String= "";
    let coma:String = ",";
    let _filter:String = "";
    
    if(filter!=""){
      _filter=`,filter:${filter}`;
    }
    for(let index=0;index<pages;index++){
    
       if(index==pages){
        coma = "";
       }
       queryString+=`${schema}Page${index+1}:${schema}(page:${index+1}${_filter}){ results {${results}}}${coma}`;
   
      }
    return `{${queryString}}`;
  }
}

module.exports.ejecutar=ejecutar;
module.exports.crearQueryFilter=crearQueryFilter;

