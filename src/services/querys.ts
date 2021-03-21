import { request, gql } from 'graphql-request';

const baseUrl = 'https://rickandmortyapi.com/graphql';
import { FilterCharacter,FilterEpisode,FilterLocation} from "./charCount/interface";

const ejecutar = async(query):Promise<void>=>{
  
  return await request(baseUrl, gql`${query}`);
}

const crearQueryFilter = (schema:string,pages:number|1,filter:String ,results:string):String=>{

  if(pages===1){

    return `${schema}(filter: ${filter}){results {${results}}}`;

  }else{
    let queryString = "";
    let coma = ",";
   
    for(let index=0;index<pages;index++){
    
       if(index==pages){
        coma = "";
       }
   
       queryString+=`${schema}Page${index+1}:${schema}(page:${index+1},filter: ${filter}){ results {${results}}}${coma}`;
   
      }
    return `{${queryString}}`;
  }
}

module.exports.ejecutar=ejecutar;
module.exports.crearQueryFilter=crearQueryFilter;

