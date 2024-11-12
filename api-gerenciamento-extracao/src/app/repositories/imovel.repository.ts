import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Imovel } from "../models/imovel.model";

export class ImovelRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(imovel: Imovel) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdSocio = await queryRunner.manager.save(Imovel, imovel);
            await queryRunner.commitTransaction();
            return createdSocio;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, imovel: Imovel) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(Imovel, id, imovel);
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
        return this.dataSource.getRepository(Imovel).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Imovel).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Imovel).delete(id);
    }
} 