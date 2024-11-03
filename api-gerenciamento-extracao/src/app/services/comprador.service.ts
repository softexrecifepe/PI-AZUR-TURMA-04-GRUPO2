import { CreateCompradorRequestDto } from "../dtos/comprador/create-comprador-request-dto";
import { CompradorResponseDto } from "../dtos/comprador/comprador-response-dto";
import { UpdateCompradorRequestDto } from "../dtos/comprador/update-comprador-request-dto";
import { Comprador } from "../models/comprador.model";
import { CompradorRepository } from "../repositories/comprador.repository";

export class CompradorService {
    private repository: CompradorRepository;

    constructor() {
        this.repository = new CompradorRepository();
    }

    async create(dto: CreateCompradorRequestDto){
        const data = dto.getAll();

        const comprador = new Comprador();
        comprador.cpf = data.cpf;
        comprador.dataExpedicao = data.dataExpedicao;
        comprador.dataNascimento = data.dataNascimento;
        comprador.documento = data.documento;
        comprador.email = data.email;
        comprador.endereco = data.endereco;
        comprador.estadoCivil = data.estadoCivil;
        comprador.filiacao = data.filiacao;
        comprador.formaPagamento = data.formaPagamento;
        comprador.nacionalidade = data.nacionalidade;
        comprador.nome = data.nome;
        comprador.orgaoExpedidor = data.orgaoExpedidor;
        comprador.profissao = data.profissao;
        comprador.rendaComprovada = data.rendaComprovada;
        comprador.rendaNaoComprovada = data.rendaNaoComprovada;
      



        const compradorcreate = await this.repository.create(comprador);
        return this.toCompradorResponseDto(compradorcreate);

    }

    async update(id: string, dto: UpdateCompradorRequestDto) {
        const comprador = await this.repository.findOne(id);
        if (!comprador) throw new Error('Comprador não encontrado');

        Object.assign(comprador, dto.getAll());
        const compradorUpdate = await this.repository.update(id, comprador);
        return this.toCompradorResponseDto(compradorUpdate)
    }

    async findOne(id: string){
        const comprador = await this.repository.findOne(id);
        if (!comprador) {
            throw new Error(`Comprador com ID ${id} não encontrado`);
        }
        const compradordto = this.toCompradorResponseDto(comprador);
        return compradordto;
    }


    async remove(id: string){
        const comprador = await this.repository.findOne(id);
        if (!comprador) {
            throw new Error(`Comprador com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }


    private toCompradorResponseDto({ id, created_at , cpf, dataExpedicao, dataNascimento, documento, email, endereco, estadoCivil, filiacao, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada }: Comprador): CompradorResponseDto {
        return { id, created_at , cpf, dataExpedicao, dataNascimento, documento, email, endereco, estadoCivil, filiacao, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada}
    }
    
}