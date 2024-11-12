import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { Incorporadora } from "../models/incorporadora.model";

export class IncorporadoraRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(incorporadora: Incorporadora): Promise<Incorporadora> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createIncorporadora = await queryRunner.manager.save(Incorporadora, incorporadora);
            await queryRunner.commitTransaction();
            return createIncorporadora;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: string, incorporadora: Incorporadora) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(Incorporadora, id, incorporadora);
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
        return this.dataSource.getRepository(Incorporadora).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Incorporadora).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Incorporadora).delete(id);
    }
}


