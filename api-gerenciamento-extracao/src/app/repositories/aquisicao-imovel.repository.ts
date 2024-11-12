import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { AquisicaoImovel } from "../models/aquisicao-imovel.model";

export class AquisicaoImovelRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(aquisicao_imovel: AquisicaoImovel) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdAquisicaoImovel = await queryRunner.manager.save(AquisicaoImovel, aquisicao_imovel);
            await queryRunner.commitTransaction();
            return createdAquisicaoImovel;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, aquisicao_imovel: AquisicaoImovel) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(AquisicaoImovel, id, aquisicao_imovel);
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
        return this.dataSource.getRepository(AquisicaoImovel).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(AquisicaoImovel).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(AquisicaoImovel).delete(id);
    }
}
