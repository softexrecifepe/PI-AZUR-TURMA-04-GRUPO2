import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { EmpresaImobiliaria } from "../models/empresaImobiliaria.model";
import { EmpresaImobiliariaRepository } from "../repositories/empresaImobiliaria.repository";

export class EmpresaImobiliariaService{ 
    private repository: EmpresaImobiliariaRepository;

    constructor(){
        this.repository = new EmpresaImobiliariaRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const empresaImobiliaria = new EmpresaImobiliaria;
        empresaImobiliaria.nomeImobiliaria = data.nomeImobiliaria;
        empresaImobiliaria.cnpj = data.cnpj;

        const savedEmpresaImobiliaria = await this.repository.save(empresaImobiliaria);
        return this.toImobiliariaResponseDto(savedEmpresaImobiliaria);

    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<ImobiliariaResponseDto>{
        const numericId = Number(id);
        const EmpresaImobiliaria = await this.repository.findOne(numericId);
        if (!EmpresaImobiliaria) throw new Error ('Empresa não encontrada');

        Object.assign(EmpresaImobiliaria, dto.getAll());
        const EmpresaImobiliariaUpdate = await this.repository.update(numericId, EmpresaImobiliaria);
        const EmpresaImobiliariadto = this.toImobiliariaResponseDto(EmpresaImobiliariaUpdate);
        return EmpresaImobiliariadto;
    }

    async findOne(id: number){
        const empresaImobiliaria = await this.repository.findOne(id);
        if (!empresaImobiliaria){
            throw new Error (`Empresa com o ID ${id} não encontrada`);
        }
        const EmpresaImobiliariadto = this.toImobiliariaResponseDto(empresaImobiliaria);
        return EmpresaImobiliariadto;
    }

    async remove(id: number){
        const empresaImobiliaria = await this.repository.findOne(id);
        if (!empresaImobiliaria){
            throw new Error (`Empresa com o ID ${id} não encontrada`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(EmpresaImobiliaria: EmpresaImobiliaria): ImobiliariaResponseDto{
        return{
            id: EmpresaImobiliaria.id,
            created_at: EmpresaImobiliaria.created_at,
            nomeImobiliaria: EmpresaImobiliaria.nomeImobiliaria,
            cnpj: EmpresaImobiliaria.cnpj
        }
    }


}