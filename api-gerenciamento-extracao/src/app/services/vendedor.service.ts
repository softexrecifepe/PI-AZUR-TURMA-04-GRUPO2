import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
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
        return this.toImobiliariaResponseDto(savedEmpresaImobiliaria);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<Vendedor>{
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new Error ('Empresa não encontrada');

        Object.assign(vendedor, dto.getAll());
        const vendedrUpdate = await this.repository.update(id, vendedor);
        const vendedorDto = this.toImobiliariaResponseDto(vendedrUpdate);
        return vendedorDto;
    }

    async findOne(id: string){
        const vendedor = await this.repository.findOne(id);
        if (!vendedor){
            throw new Error (`Vendedor com o ID ${id} não encontrado`);
        }
        const EmpresaImobiliariadto = this.toImobiliariaResponseDto(vendedor);
        return EmpresaImobiliariadto;
    }

    async remove(id: string){
        const vendedor = await this.repository.findOne(id);
        if (!vendedor){
            throw new Error (`Vendedor com o ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(vendedor: Vendedor): ImobiliariaResponseDto{
        return{
            id: vendedor.id,
            created_at: vendedor.created_at,
            nomeImobiliaria: vendedor.nomeImobiliaria,
            cnpj: vendedor.cnpj
        }
    }


}