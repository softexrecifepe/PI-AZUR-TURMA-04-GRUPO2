import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Socio } from "../app/models/socio.model";
import { Representante } from "../app/models/representante.model";
import { Endereco } from "../app/models/endereco.model";
import { Imovel } from "../app/models/imovel.model";
import { Comprador } from "../app/models/comprador.model";
import { Vendedor } from "../app/models/vendedor.model";
import { Incorporadora } from "../app/models/incorporadora.model";
import { EmpreendedorFiador } from "../app/models/empreendedorFiador.model";
import { Credora } from "../app/models/credora.model";
import { ConstrutoraFiadora } from "../app/models/construtoraFiadora.model";
import { AquisicaoImovel } from "../app/models/aquisicao-imovel.model";


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
    migrations: ["src/database/migrations/*.ts"],
    subscribers: []
});