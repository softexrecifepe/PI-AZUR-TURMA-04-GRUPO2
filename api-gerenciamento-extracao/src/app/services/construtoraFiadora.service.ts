import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { ConstrutoraFiadora } from "../models/construtoraFiadora.model";
import { ConstrutoraFiadoraRepository } from "../repositories/construtoraFiadora.repository";


export class ConstrutoraFiadoraService{ 
    private repository: ConstrutoraFiadoraRepository;

    constructor(){
        this.repository = new ConstrutoraFiadoraRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const construtoraFiadora = new ConstrutoraFiadora();
        construtoraFiadora.nomeImobiliaria = data.nomeImobiliaria;
        construtoraFiadora.cnpj = data.cnpj;

        const savedConstrutoraFiadora = await this.repository.create(construtoraFiadora);
        return this.toImobiliariaResponseDto(savedConstrutoraFiadora);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<ConstrutoraFiadora>{
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora) throw new Error ('Construtora e Fiadora não encontrada');

        Object.assign(construtoraFiadora, dto.getAll());
        const construtoraFiadoraUpdate = await this.repository.update(id, construtoraFiadora);
        const construtoraFiadoraDto = this.toImobiliariaResponseDto(construtoraFiadoraUpdate);
        return construtoraFiadoraDto;
    }

    async findOne(id: string){
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora){
            throw new Error (`Construtora e Fiadora com o ID ${id} não encontrada`);
        }
        const construtoraFiadoraDto = this.toImobiliariaResponseDto(construtoraFiadora);
        return construtoraFiadoraDto;
    }

    async remove(id: string){
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora){
            throw new Error (`Construtora e Fiadora com o ID ${id} não encontrada`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(construtoraFiadora: ConstrutoraFiadora): ImobiliariaResponseDto{
        return{
            id: construtoraFiadora.id,
            created_at: construtoraFiadora.created_at,
            nomeImobiliaria: construtoraFiadora.nomeImobiliaria,
            cnpj: construtoraFiadora.cnpj
        }
    }


}