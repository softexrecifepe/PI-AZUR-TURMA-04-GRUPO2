import { CreateSocioRequestDto } from "../dtos/socio/create-socio-request-dto";
import { SocioResponseDto } from "../dtos/socio/socio-response-dto";
import { UpdateSocioRequestDto } from "../dtos/socio/update-socio-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Socio } from "../models/socio.model";
import { SocioRepository } from "../repositories/socio.repository";

export class SocioService {
    private repository: SocioRepository;

    constructor() {
        this.repository = new SocioRepository();
    }

    async create(dto: CreateSocioRequestDto) {
        const data = dto.getAll();

        const socio = new Socio();
        Object.assign(socio, data);
        const socioCreate = await this.repository.create(socio);
        return this.toSocioResponseDto(socioCreate);
    }

    async update(id: string, dto: UpdateSocioRequestDto) {
        const socio = await this.repository.findOne(id);
        if (!socio) throw new NotFoundError('Sócio não encontrado');

        Object.assign(socio, dto.getAll());

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

    private toSocioResponseDto({ id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai }: Socio): SocioResponseDto {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai };
    }
}
