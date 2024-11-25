import { DataSource } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Endereco } from "../models/endereco.model";

export class EnderecoRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(endereco: Endereco) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdSocio = await queryRunner.manager.save(Endereco, endereco);
            await queryRunner.commitTransaction();
            return createdSocio;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, endereco: Endereco) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(Endereco, id, endereco);
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
        return this.dataSource.getRepository(Endereco).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Endereco).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Endereco).delete(id);
    }
} 