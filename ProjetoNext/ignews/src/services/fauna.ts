// configurando acesso ao banco de dados do fauna db
import { Client } from 'faunadb';

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
});