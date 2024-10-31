import { CreateCredoraRequestDto } from "../dtos/credora/create-credora-request-dto";
import { CredoraResponseDto } from "../dtos/credora/credora-response-dto";
import { UpdateCredoraRequestDto } from "../dtos/credora/update-credora-request-dto";  
import { Credora } from "../models/credora.model";
import { CredoraRepository } from "../repositories/credora.repository";


export class CredoraService { 
    private repository: CredoraRepository;

    constructor(){
        this.repository = new CredoraRepository();
    }

    async create(dto: CreateCredoraRequestDto){
        const data = dto.getAll();

        const credora = new Credora();
        credora.nomeCredora = data.nomeCredora;
        credora.nomeDoravante = data.nomeDoravante;
        credora.cnpj = data.cnpj;

        const savedCredora = await this.repository.save(credora);
        return this.toCredoraResponseDto(savedCredora);
    }

    async update(id: string, dto: UpdateCredoraRequestDto): Promise<CredoraResponseDto> {
        const credora = await this.repository.findOne(id);
        if (!credora) throw new Error ('Credora não encontrada!');

        Object.assign(credora, dto.getAll());
        const credoraUpdate = await this.repository.update(id, credora);
        const credoradto = this.toCredoraResponseDto(credoraUpdate);
        return credoradto;
    }

    async findOne(id: string){
        const credora = await this.repository.findOne(id);
        if (!credora){
            throw new Error(`Credora com o ID ${id} não encontrado!`);
        }
        const credoradto = this.toCredoraResponseDto(credora);
        return credoradto;
        
    }

    async remove(id: string){
        const credora = await this.repository.findOne(id);
        if (!credora){
            throw new Error (`Credora com o ID ${id} não encontrado!`);
        }
        await this.repository.remove(id);
    }

    private toCredoraResponseDto({
        id, 
        created_at,
        nomeCredora,
        nomeDoravante,
        cnpj,
    }: Credora): CredoraResponseDto {
        return { id, created_at, nomeCredora, nomeDoravante, cnpj}
    }

}