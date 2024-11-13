import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Vendedor } from "../models/vendedor.model";
import { VendedorRepository } from "../../../../api-gerenciamento-extracao/src/app/repositories/vendedor.repository";

export class VendedorService{ 
    private repository: VendedorRepository;

    constructor(){
        this.repository = new VendedorRepository();
    }

    async findOne(id: string){
        const vendedor = await this.repository.findById(id);
        if (!vendedor) throw new NotFoundError(`Vendedor com o ID ${id} não encontrado`);
        return this.toVendedorResponseDto(vendedor);
    }
    
    async findAll() {
        const vendedor = await this.repository.findAll();
        return vendedor.map((rep) => this.toVendedorResponseDto(rep));
    }

    private toVendedorResponseDto(vendedor: Vendedor): ImobiliariaResponseDto{
        return{
            id: vendedor.id,
            created_at: vendedor.created_at,
            nomeImobiliaria: vendedor.nomeImobiliaria,
            cnpj: vendedor.cnpj,
            email: vendedor.email,
            numNire: vendedor.numNire,
            dataSessao: vendedor.dataSessao,
            endereco: vendedor.endereco,
            socio: vendedor.socio
        }
    }


}