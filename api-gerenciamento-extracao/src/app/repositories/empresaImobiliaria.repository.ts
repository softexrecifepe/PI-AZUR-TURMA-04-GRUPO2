import { DataSource } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import { EmpresaImobiliaria  } from "../models/empresaImobiliaria.model"; 

export class EmpresaImobiliariaRepository {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = AppDataSource;
    }

   async save(EmpresaImobiliaria : EmpresaImobiliaria): Promise<EmpresaImobiliaria>{
        return this.dataSource.getRepository(EmpresaImobiliaria).save(EmpresaImobiliaria);
   }

    async update(id: number, empresaImobiliaria: EmpresaImobiliaria) {
        await this.dataSource.getRepository(EmpresaImobiliaria).update(id, empresaImobiliaria);
        return this.findOne(id);
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


