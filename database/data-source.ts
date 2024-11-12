import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Socio } from "../api-gerenciamento-extracao/src/app/models/socio.model";
import { Representante } from "../api-gerenciamento-extracao/src/app/models/representante.model"; 
import { Endereco } from "../api-gerenciamento-extracao/src/app/models/endereco.model"; 
import { Imovel } from "../api-gerenciamento-extracao/src/app/models/imovel.model"; 
import { Comprador } from "../api-gerenciamento-extracao/src/app/models/comprador.model"; 
import { Vendedor } from "../api-gerenciamento-extracao/src/app/models/vendedor.model"; 
import { Incorporadora } from "../api-gerenciamento-extracao/src/app/models/incorporadora.model"; 
import { EmpreendedorFiador } from "../api-gerenciamento-extracao/src/app/models/empreendedorFiador.model"; 
import { Credora } from "../api-gerenciamento-extracao/src/app/models/credora.model"; 
import { ConstrutoraFiadora } from "../api-gerenciamento-extracao/src/app/models/construtoraFiadora.model"; 
import { AquisicaoImovel } from "../api-gerenciamento-extracao/src/app/models/aquisicao-imovel.model"; 


dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    // Somente use synchronize em ambiente de desenvolvimento, desabilite em produção
    synchronize: NODE_ENV === "dev" ? false : false,
    logging: NODE_ENV === "dev" ? true : false,
    entities: [Endereco, Socio, Representante, Comprador, Imovel, Vendedor, Incorporadora, EmpreendedorFiador, Credora, ConstrutoraFiadora, AquisicaoImovel],
    migrations: ["database/migrations/*.ts"],
    subscribers: []
});