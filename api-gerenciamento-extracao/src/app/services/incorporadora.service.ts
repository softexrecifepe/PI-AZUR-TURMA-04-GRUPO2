import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { Incorporadora } from "../models/incorporadora.model";
import { IncorporadoraRepository } from "../repositories/incorporadora.repository";


export class IncorporadoraService{ 
    private repository: IncorporadoraRepository;

    constructor(){
        this.repository = new IncorporadoraRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const incorporadora = new Incorporadora();
        incorporadora.nomeImobiliaria = data.nomeImobiliaria;
        incorporadora.cnpj = data.cnpj;

        const savedIncorporadora = await this.repository.create(incorporadora);
        return this.toImobiliariaResponseDto(savedIncorporadora);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<Incorporadora>{
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora) throw new Error ('Incorporadora não encontrada');

        Object.assign(incorporadora, dto.getAll());
        const incorporadoraUpdate = await this.repository.update(id, incorporadora);
        const incorporadoraDto = this.toImobiliariaResponseDto(incorporadoraUpdate);
        return incorporadoraDto;
    }

    async findOne(id: string){
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora){
            throw new Error (`Incorporadora com o ID ${id} não encontrada`);
        }
        const incorporadoraDto = this.toImobiliariaResponseDto(incorporadora);
        return incorporadoraDto;
    }

    async remove(id: string){
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora){
            throw new Error (`Incorporadora com o ID ${id} não encontrada`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(incorporadora: Incorporadora): ImobiliariaResponseDto{
        return{
            id: incorporadora.id,
            created_at: incorporadora.created_at,
            nomeImobiliaria: incorporadora.nomeImobiliaria,
            cnpj: incorporadora.cnpj
        }
    }


}