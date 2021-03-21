
import { gql } from 'graphql-request';
const querys = require("./querys");
const obtenerCantidadPaginas =async (queryRaw:string) => {
    const query = gql`query ${queryRaw}`;
    return querys.ejecutar(query);
}
module.exports.obtenerCantidadPaginas = obtenerCantidadPaginas;

