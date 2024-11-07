import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Socio } from "../app/models/socio.model";
import { Representante } from "../app/models/representante.model";
import { Endereco } from "../app/models/endereco.model";
import { Imovel } from "../app/models/imovel.model";


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
    entities: [Endereco, Socio],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: []
});