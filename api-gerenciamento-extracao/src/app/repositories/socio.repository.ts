import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Socio } from "../models/socio.model";

export class SocioRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(socio: Socio) {
        return this.dataSource.getRepository(Socio).save(socio);
    }

    async update(id: number, socio: Socio) {
        await this.dataSource.getRepository(Socio).update(id, socio);
        return this.findOne(id);
    }

    async findAll() {
        return this.dataSource.getRepository(Socio).find();
    }

    async findOne(id: number) {
        return this.dataSource.getRepository(Socio).findOneBy({ id });
    }

    async remove(id: number) {
        return this.dataSource.getRepository(Socio).delete(id);
    }
}
