import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Representante } from "../models/representante.model";


export class RepresentanteRepository {
    private dataSource: DataSource;;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(representante: Representante){
        return this.dataSource.getRepository(Representante).save(representante);
    }

    async update(id: number, representante: Representante){
        await this.dataSource.getRepository(Representante).update(id, representante);
    }

    async findAll(){
        return this.dataSource.getRepository(Representante).find();
    }

    async findOne(id: number) {
        return this.dataSource.getRepository(Representante).findOneBy({ id });
    }

    async remove(id: number) {
        return this.dataSource.getRepository(Representante).delete(id);
    }
}