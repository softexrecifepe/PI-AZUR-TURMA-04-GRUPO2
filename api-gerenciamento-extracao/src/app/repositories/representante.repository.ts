import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Representante } from "../models/representante.model";


export class RepresentanteRepository {
    private dataSource: DataSource;;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(representante: Representante){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const createdSocio = await queryRunner.manager.save(Representante, representante);
            await queryRunner.commitTransaction();
            return createdSocio;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, representante: Representante){
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.update(Representante, id, representante);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(){
        return this.dataSource.getRepository(Representante).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Representante).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Representante).delete(id);
    }
}