import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { Credora } from "../models/credora.model";

export class CredoraRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create( credora: Credora): Promise<Credora> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createCredora = await queryRunner.manager.save(Credora, credora);
            await queryRunner.commitTransaction();
            return createCredora;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: number, credora: Credora) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(Credora, id, credora);
            await queryRunner.commitTransaction();
            return this.findOne(id);
        } catch(error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
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
