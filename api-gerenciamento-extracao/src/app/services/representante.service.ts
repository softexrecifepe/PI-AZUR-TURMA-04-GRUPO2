import { CreateRepresentanteRequestDto } from "../dtos/representante/create-representante-request-dto";
import { RepresentanteResponseDTO } from "../dtos/representante/representante-response-dtos";
import { UpdateRepresentanteRequestDto } from "../dtos/representante/update-representante-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Representante } from "../models/representante.model";
import { RepresentanteRepository } from "../repositories/representante.repository";

export class RepresentanteService {
    private repository: RepresentanteRepository;

    constructor() {
        this.repository = new RepresentanteRepository();

    }

    async create(dto: CreateRepresentanteRequestDto) {

        const data = dto.getAll();

        const representante = new Representante();
        Object.assign(representante, data);
        const representanteCreate = await this.repository.create(representante);
        return this.toRepresentanteResponseDto(representanteCreate);
    }

    async update(id: string, dto: UpdateRepresentanteRequestDto) {
        const representante = await this.repository.findOne(id);
        if (!representante) throw new NotFoundError('Sócio não encontrado');

        Object.assign(representante, dto.getAll());

        const representanteUpdate = await this.repository.update(id, representante);
        return this.toRepresentanteResponseDto(representanteUpdate);
    }

    private toRepresentanteResponseDto({
        id, 
        created_at, 
        nome, 
        nacionalidade, 
        dataNascimento, 
        profissao, 
        email, 
        numDocumento, 
        dataExpedicao, 
        orgaoExpedidor, 
        regimeComunhao, 
        cpf, 
        estadoCivil, 
        nome_mae, 
        nome_pai

    }: Representante): RepresentanteResponseDTO {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai };
    }




}