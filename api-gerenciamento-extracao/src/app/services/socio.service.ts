import { CreateSocioRequestDto } from "../dtos/socio/create-socio-request-dto";
import { SocioResponseDto } from "../dtos/socio/socio-response-dto";
import { UpdateSocioRequestDto } from "../dtos/socio/update-socio-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Socio } from "../models/socio.model";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { SocioRepository } from "../repositories/socio.repository";

export class SocioService {
    private repository: SocioRepository;

    constructor() {
        this.repository = new SocioRepository();
    }

    async create(dto: CreateSocioRequestDto) {
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")

        const socio = new Socio();
        socio.endereco = endereco;
        socio.nome = data.nome;
        socio.nacionalidade = data.nacionalidade;
        socio.email = data.email;
        socio.dataNascimento = data.dataNascimento;
        socio.profissao = data.profissao;
        socio.cpf = data.cpf;
        socio.numDocumento = data.numDocumento;
        socio.dataExpedicao = data.dataExpedicao;
        socio.orgaoExpedidor = data.orgaoExpedidor;
        socio.estadoCivil = data.estadoCivil;
        socio.regimeComunhao = data.regimeComunhao;
        socio.nome_mae = data.nome_mae;
        socio.nome_pai = data.nome_pai;
        const socioCreate = await this.repository.create(socio);
        return this.toSocioResponseDto(socioCreate);
    }

    async update(id: string, dto: UpdateSocioRequestDto) {
        const socio = await this.repository.findOne(id);
        if (!socio) throw new NotFoundError('Sócio não encontrado');

        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new NotFoundError("Endereço não encontrado");
            socio.endereco = endereco;
        }

        socio.nome = data.nome ?? socio.nome;
        socio.nacionalidade = data.nacionalidade ?? socio.nacionalidade;
        socio.email = data.email ?? socio.email;
        socio.dataNascimento = data.dataNascimento ?? socio.dataNascimento;
        socio.profissao = data.profissao ?? socio.profissao;
        socio.cpf = data.cpf ?? socio.cpf;
        socio.numDocumento = data.numDocumento ?? socio.numDocumento;
        socio.dataExpedicao = data.dataExpedicao ?? socio.dataExpedicao;
        socio.orgaoExpedidor = data.orgaoExpedidor ?? socio.orgaoExpedidor;
        socio.estadoCivil = data.estadoCivil ?? socio.estadoCivil;
        socio.regimeComunhao = data.regimeComunhao ??socio.regimeComunhao; 
        socio.nome_mae = data.nome_mae ?? socio.nome_mae;
        socio.nome_pai = data.nome_pai ?? socio.nome_pai;

        const socioUpdate = await this.repository.update(id, socio);
        return this.toSocioResponseDto(socioUpdate);

    }

    async findOne(id: string) {
        const socio = await this.repository.findOne(id);
        if (!socio) throw new NotFoundError(`Sócio com ID ${id} não encontrado`);
        return this.toSocioResponseDto(socio);
    }

    async remove(id: string) {
        const socio = await this.repository.findOne(id);
        if (!socio) throw new NotFoundError(`Sócio com ID ${id} não encontrado`);
        await this.repository.remove(id);
    }

    private toSocioResponseDto({ id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai, endereco }: Socio): SocioResponseDto {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai, endereco };
    }
}
