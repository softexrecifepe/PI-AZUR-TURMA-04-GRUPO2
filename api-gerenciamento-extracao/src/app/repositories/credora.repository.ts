import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Credora } from "../models/credora.model";

export class CredoraRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async save(credora: Credora): Promise<Credora> {
        const repository = this.dataSource.getRepository(Credora);
        return await repository.save(credora);
    }

    async update(id: string, credora: Credora) {
        await this.dataSource.getRepository(Credora).update(id, credora);
        return this.findOne(id);
    }

    async findAll() {
        return this.dataSource.getRepository(Credora).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Credora).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Credora).delete(id);
    }
}
