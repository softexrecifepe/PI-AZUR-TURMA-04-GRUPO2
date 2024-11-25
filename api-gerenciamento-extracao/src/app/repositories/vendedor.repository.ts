import { DataSource } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import { Vendedor } from "../models/vendedor.model";

export class VendedorRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

    async create(vendedor: Vendedor): Promise<Vendedor> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const createVendedor = await queryRunner.manager.save(Vendedor, vendedor);
            await queryRunner.commitTransaction();
            return createVendedor;
        } catch (error){
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }

    async update(id: string, vendedor: Vendedor) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            await queryRunner.manager.update(Vendedor, id, vendedor);
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
        return this.dataSource.getRepository(Vendedor).find();
    }

    async findOne(id: string) {
        return this.dataSource.getRepository(Vendedor).findOneBy({ id });
    }

    async remove(id: string) {
        return this.dataSource.getRepository(Vendedor).delete(id);
    }

    async findById(id: string) {
        return this.dataSource.getRepository(Vendedor).findOne({
            where: { id },
            relations: ["socio", "socio.endereco", "endereco"],
        });
    }
}


