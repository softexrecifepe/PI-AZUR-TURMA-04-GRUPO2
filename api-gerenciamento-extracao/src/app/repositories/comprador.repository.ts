import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Comprador } from "../models/comprador.model";

export class CompradorRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(comprador: Comprador) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdComprador = await queryRunner.manager.save(Comprador, comprador);
            await queryRunner.commitTransaction();
            return createdComprador;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, comprador: Comprador) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(Comprador, id, comprador);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() {
        return this.dataSource.getRepository(Comprador).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Comprador).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Comprador).delete(id);
    }
}
