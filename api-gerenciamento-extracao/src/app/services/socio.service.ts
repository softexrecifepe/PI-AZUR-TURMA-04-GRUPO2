import { CreateSocioRequestDto } from "../dtos/socio/create-socio-request-dto";
import { SocioResponseDto } from "../dtos/socio/socio-response-dto";
import { UpdateSocioRequestDto } from "../dtos/socio/update-socio-request-dto";
import { Socio } from "../models/socio.model";
import { SocioRepository } from "../repositories/socio.repository";

export class SocioService {
    private repository: SocioRepository;

    constructor() {
        this.repository = new SocioRepository();
    }

    async create(dto: CreateSocioRequestDto) {
        const data  = dto.getAll();
        
        const socio = new Socio();
        socio.nome = data.nome;
        socio.nacionalidade = data.nacionalidade;
        socio.dataNascimento = data.dataNascimento;
        socio.profissao = data.profissao;
        socio.email = data.email;
        socio.numeroCarteiraFuncional = data.numeroCarteiraFuncional;
        socio.dataExpedicaoCREA = data.dataExpedicaoCREA;
        socio.cpf = data.cpf;
        socio.estadoCivil = data.estadoCivil;
        socio.nome_mae = data.nome_mae;
        socio.nome_pai = data.nome_pai;

        const socioCreate = await this.repository.create(socio);
        return this.toSocioResponseDto(socioCreate);
    }

    async update(id: string, dto: UpdateSocioRequestDto) {
        const socio = await this.repository.findOne(id);
        if (!socio) throw new Error('Sócio não encontrado');

        Object.assign(socio, dto.getAll());
        const socioUpdate = await this.repository.update(id, socio);
        return this.toSocioResponseDto(socioUpdate);

    }

    private toSocioResponseDto({ id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numeroCarteiraFuncional, dataExpedicaoCREA, cpf, estadoCivil, nome_mae, nome_pai }: Socio): SocioResponseDto {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, email, numeroCarteiraFuncional, dataExpedicaoCREA, cpf, estadoCivil, nome_mae, nome_pai };
    }
}
