import { CompradorResponseDto } from "../dtos/comprador/comprador-response-dto";
import { Comprador } from "../models/comprador.model";
import { CompradorRepository } from "../../../../api-gerenciamento-extracao/src/app/repositories/comprador.repository";
import { NotFoundError } from "../errors/not-found.error";

export class CompradorService {
    private repository: CompradorRepository;

    constructor() {
        this.repository = new CompradorRepository();
    }

    async findOne(id: string) {
        const comprador = await this.repository.findOne(id);
        if (!comprador) {
            throw new NotFoundError(`Comprador com ID ${id} não encontrado`);
        }
        const compradordto = this.toCompradorResponseDto(comprador);
        return compradordto;
    }

    async findAll() {
        const comprador = await this.repository.findAll();
        return comprador.map((rep) => this.toCompradorResponseDto(rep));
    }

    private toCompradorResponseDto({ id, created_at, cpf, dataExpedicao, dataNascimento, numDocumento, email, endereco, estadoCivil, nome_mae, nome_pai, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada, regimeComunhao }: Comprador): CompradorResponseDto {
        return { id, created_at, cpf, dataExpedicao, dataNascimento, numDocumento, email, endereco, estadoCivil, nome_mae, nome_pai, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada, regimeComunhao }
    }

}