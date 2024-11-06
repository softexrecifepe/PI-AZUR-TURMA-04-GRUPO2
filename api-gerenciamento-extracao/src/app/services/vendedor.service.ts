import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Vendedor } from "../models/vendedor.model";
import { VendedorRepository } from "../repositories/vendedor.repository";

export class VendedorService{ 
    private repository: VendedorRepository;

    constructor(){
        this.repository = new VendedorRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const vendedor = new Vendedor();
        vendedor.nomeImobiliaria = data.nomeImobiliaria;
        vendedor.cnpj = data.cnpj;

        const savedEmpresaImobiliaria = await this.repository.create(vendedor);
        return this.toVendedorResponseDto(savedEmpresaImobiliaria);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<Vendedor>{
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new NotFoundError('Empresa não encontrada');

        Object.assign(vendedor, dto.getAll());
        const vendedrUpdate = await this.repository.update(id, vendedor);
        return this.toVendedorResponseDto(vendedrUpdate);
    }

    async findOne(id: string){
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new NotFoundError(`Vendedor com o ID ${id} não encontrado`);
        return this.toVendedorResponseDto(vendedor);
    }

    async remove(id: string){
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new NotFoundError(`Vendedor com o ID ${id} não encontrado`);
        await this.repository.remove(id);
    }

    private toVendedorResponseDto(vendedor: Vendedor): ImobiliariaResponseDto{
        return{
            id: vendedor.id,
            created_at: vendedor.created_at,
            nomeImobiliaria: vendedor.nomeImobiliaria,
            cnpj: vendedor.cnpj
        }
    }


}