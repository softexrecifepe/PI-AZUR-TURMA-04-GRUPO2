import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Credora } from "../models/credora.model";

export class CredoraRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(credora: Credora) {
        return this.dataSource.getRepository(Credora).save(credora);
    }

    async update(id: number, credora: Credora) {
        await this.dataSource.getRepository(Credora).update(id, credora);
        return this.findOne(id);
    }

    async findAll() {
        return this.dataSource.getRepository(Credora).find();
    }

    async findOne(id: number) {
        return this.dataSource.getRepository(Credora).findOneBy({ id });
    }

    async remove(id: number) {
        return this.dataSource.getRepository(Credora).delete(id);
    }
}
