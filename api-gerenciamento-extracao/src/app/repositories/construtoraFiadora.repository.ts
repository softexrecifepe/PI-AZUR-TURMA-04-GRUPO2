import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { ConstrutoraFiadora } from "../models/construtoraFiadora.model";

export class ConstrutoraFiadoraRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(construtoraFiadora: ConstrutoraFiadora): Promise<ConstrutoraFiadora> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createConstrutoraFiadora = await queryRunner.manager.save(ConstrutoraFiadora, construtoraFiadora);
            await queryRunner.commitTransaction();
            return createConstrutoraFiadora;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: string, construtoraFiadora: ConstrutoraFiadora) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(ConstrutoraFiadora, id, construtoraFiadora);
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
        return this.dataSource.getRepository(ConstrutoraFiadora).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(ConstrutoraFiadora).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(ConstrutoraFiadora).delete(id);
    }
}


