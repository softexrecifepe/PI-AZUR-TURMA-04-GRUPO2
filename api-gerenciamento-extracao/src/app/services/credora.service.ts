import { CreateCredoraRequestDto } from "../dtos/credora/create-credora-request-dto";
import { CredoraResponseDto } from "../dtos/credora/credora-response-dto";
import { UpdateCredoraRequestDto } from "../dtos/credora/update-credora-request-dto";  
import { NotFoundError } from "../errors/not-found.error";
import { Credora } from "../models/credora.model";
import { CredoraRepository } from "../repositories/credora.repository";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { RepresentanteRepository } from "../repositories/representante.repository";


export class CredoraService { 
    private repository: CredoraRepository;

    constructor(){
        this.repository = new CredoraRepository();
    }

    async create(dto: CreateCredoraRequestDto){
        const data = dto.getAll();

        const representanteRepository = new RepresentanteRepository();
        const representante = await representanteRepository.findOne(data.representanteId);
        if (!representante) throw new NotFoundError('Representante não encontrado');

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")

        const credora = new Credora();
        credora.nomeCredora = data.nomeCredora;
        credora.nomeDoravante = data.nomeDoravante;
        credora.cnpj = data.cnpj;
        credora.representante = representante; 
        credora.endereco = endereco;

        const savedCredora = await this.repository.create(credora);
        return this.toCredoraResponseDto(savedCredora);
    }

    async update(id: string, dto: UpdateCredoraRequestDto): Promise<CredoraResponseDto> {
        const credora = await this.repository.findOne(id);
        if (!credora) throw new NotFoundError('Credora não encontrada!');

        const data = dto.getAll();
        if(data.representanteId){
            const representanteRepository = new RepresentanteRepository();
            const representante = await representanteRepository.findOne(data.representanteId);
            if (!representante) throw new NotFoundError('Representante não encontrado');
            credora.representante = representante;
        }

        if(data.enderecoId){
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);
            if (!endereco) throw new NotFoundError('Endereço não encontrado');
            credora.endereco = endereco;
        }

        credora.nomeCredora = data.nomeCredora ?? credora.nomeCredora;
        credora.nomeDoravante = data.nomeDoravante ?? credora.nomeDoravante;
        credora.cnpj = data.cnpj ?? credora.cnpj;
        
        const credoraUpdate = await this.repository.update(id, credora);
        const credoradto = this.toCredoraResponseDto(credoraUpdate);
        return credoradto;
    }

    async findOne(id: string){
        const credora = await this.repository.findOne(id);
        if (!credora){
            throw new NotFoundError(`Credora com o ID ${id} não encontrado!`);
        }
        const credoradto = this.toCredoraResponseDto(credora);
        return credoradto;
        
    }

    async remove(id: string){
        const credora = await this.repository.findOne(id);
        if (!credora){
            throw new NotFoundError(`Credora com o ID ${id} não encontrado!`);
        }
        await this.repository.remove(id);
    }

    private toCredoraResponseDto({
        id, 
        created_at,
        nomeCredora,
        nomeDoravante,
        cnpj,
        representante,
        endereco
    }: Credora): CredoraResponseDto {
        return { id, created_at, nomeCredora, nomeDoravante, cnpj, representante, endereco}
    }

}