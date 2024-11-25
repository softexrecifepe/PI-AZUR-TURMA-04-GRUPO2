import { DataSource } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { EmpreendedorFiador } from "../models/empreendedorFiador.model";

export class EmpreendedorFiadorRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(empreendedorFiador: EmpreendedorFiador): Promise<EmpreendedorFiador> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createEmpreendedorFiador = await queryRunner.manager.save(EmpreendedorFiador, empreendedorFiador);
            await queryRunner.commitTransaction();
            return createEmpreendedorFiador;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: string, empreendedorFiador: EmpreendedorFiador) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(EmpreendedorFiador, id, empreendedorFiador);
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
        return this.dataSource.getRepository(EmpreendedorFiador).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(EmpreendedorFiador).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(EmpreendedorFiador).delete(id);
    }
}


