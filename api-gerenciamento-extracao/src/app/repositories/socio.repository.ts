import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Socio } from "../models/socio.model";

export class SocioRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(socio: Socio) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdSocio = await queryRunner.manager.save(Socio, socio);
            await queryRunner.commitTransaction();
            return createdSocio;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, socio: Socio) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(Socio, id, socio);
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
        return this.dataSource.getRepository(Socio).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Socio).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Socio).delete(id);
    }

    async findById(id: string) {
        return this.dataSource.getRepository(Socio).findOne({
            where: { id },
            relations: ['endereco'],
        });
    }
}
