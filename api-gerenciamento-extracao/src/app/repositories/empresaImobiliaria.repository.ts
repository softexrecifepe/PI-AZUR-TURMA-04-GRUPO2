import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { EmpresaImobiliaria  } from "../models/empresaImobiliaria.model"; 
import { Endereco } from "../models/endereco.model";

export class EmpresaImobiliariaRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create( empresaImobiliaria: EmpresaImobiliaria): Promise<EmpresaImobiliaria> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createEmpresaImobiliaria = await queryRunner.manager.save(EmpresaImobiliaria, empresaImobiliaria);
            await queryRunner.commitTransaction();
            return createEmpresaImobiliaria;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: number, credora: EmpresaImobiliaria) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(EmpresaImobiliaria, id, credora);
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
        return this.dataSource.getRepository(EmpresaImobiliaria).find();
    }

    async findOne(id: number) {
        return this.dataSource.getRepository(EmpresaImobiliaria).findOneBy({ id });
    }

    async remove(id: number) {
        return this.dataSource.getRepository(EmpresaImobiliaria).delete(id);
    }
}


