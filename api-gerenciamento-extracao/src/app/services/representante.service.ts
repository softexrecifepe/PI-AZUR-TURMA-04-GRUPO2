import { CreateRepresentanteRequestDto } from "../dtos/representante/create-representante-request-dto";
import { RepresentanteResponseDTO } from "../dtos/representante/representante-response-dtos";
import { UpdateRepresentanteRequestDto } from "../dtos/representante/update-representante-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Representante } from "../models/representante.model";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { RepresentanteRepository } from "../repositories/representante.repository";

export class RepresentanteService {
    private repository: RepresentanteRepository;

    constructor() {
        this.repository = new RepresentanteRepository();

    }

    async create(dto: CreateRepresentanteRequestDto) {
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")

        const representante = new Representante();
        representante.endereco = endereco;
        representante.nome = data.nome;
        representante.nacionalidade = data.nacionalidade;
        representante.email = data.email;
        representante.dataNascimento = data.dataNascimento;
        representante.profissao = data.profissao;
        representante.cpf = data.cpf;
        representante.numDocumento = data.numDocumento;
        representante.dataExpedicao = data.dataExpedicao;
        representante.orgaoExpedidor = data.orgaoExpedidor;
        representante.estadoCivil = data.estadoCivil;
        representante.regimeComunhao = data.regimeComunhao;
        representante.nome_mae = data.nome_mae;
        representante.nome_pai = data.nome_pai;

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
        nome_pai,
        endereco

    }: Representante): RepresentanteResponseDTO {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai, endereco };
    }




}