import { SocioResponseDto } from "../dtos/socio/socio-response-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Socio } from "../models/socio.model";
import { SocioRepository } from "../../../../api-gerenciamento-extracao/src/app/repositories/socio.repository";

export class SocioService {
    private repository: SocioRepository;

    constructor() {
        this.repository = new SocioRepository();
    }

    async findOne(id: string) {
        const socio = await this.repository.findById(id);
        if (!socio) throw new NotFoundError(`Sócio com ID ${id} não encontrado`);
        return this.toSocioResponseDto(socio);
    }

    async findAll() {
        const socio = await this.repository.findAll();
        return socio.map((rep) => this.toSocioResponseDto(rep));
    }

    private toSocioResponseDto({ id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai, endereco }: Socio): SocioResponseDto {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numDocumento, dataExpedicao, orgaoExpedidor, regimeComunhao, cpf, estadoCivil, nome_mae, nome_pai, endereco };
    }
}
