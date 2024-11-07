import { CreateCompradorRequestDto } from "../dtos/comprador/create-comprador-request-dto";
import { CompradorResponseDto } from "../dtos/comprador/comprador-response-dto";
import { UpdateCompradorRequestDto } from "../dtos/comprador/update-comprador-request-dto";
import { Comprador } from "../models/comprador.model";
import { CompradorRepository } from "../repositories/comprador.repository";
import { EnderecoRepository } from "../repositories/endereco.repository";

export class CompradorService {
    private repository: CompradorRepository;

    constructor() {
        this.repository = new CompradorRepository();
    }

    async create(dto: CreateCompradorRequestDto) {
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new Error("Endereço não encontrado")

        const comprador = new Comprador();
        comprador.cpf = data.cpf;
        comprador.dataExpedicao = data.dataExpedicao;
        comprador.dataNascimento = data.dataNascimento;
        comprador.numDocumento = data.numDocumento;
        comprador.email = data.email;
        comprador.endereco = endereco;
        comprador.estadoCivil = data.estadoCivil;
        comprador.nome_mae = data.nome_mae;
        comprador.nome_pai = data.nome_pai;
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

        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new Error("Endereço não encontrado");
            comprador.endereco = endereco;
        }

        comprador.cpf = data.cpf ?? comprador.cpf;
        comprador.dataExpedicao = data.dataExpedicao ?? comprador.dataExpedicao;
        comprador.dataNascimento = data.dataNascimento ?? comprador.dataNascimento;
        comprador.numDocumento = data.numDocumento ?? comprador.numDocumento
        comprador.email = data.email ?? comprador.email
        comprador.estadoCivil = data.estadoCivil ?? comprador.estadoCivil
        comprador.nome_mae = data.nome_mae ?? comprador.nome_mae;
        comprador.nome_pai = data.nome_pai ?? comprador.nome_pai;
        comprador.formaPagamento = data.formaPagamento ?? comprador.formaPagamento
        comprador.nacionalidade = data.nacionalidade ?? comprador.nacionalidade
        comprador.nome = data.nome ?? comprador.nome
        comprador.orgaoExpedidor = data.orgaoExpedidor ?? comprador.orgaoExpedidor
        comprador.profissao = data.profissao ?? comprador.profissao
        comprador.rendaComprovada = data.rendaComprovada ?? comprador.rendaComprovada
        comprador.rendaNaoComprovada = data.rendaNaoComprovada ?? comprador.rendaNaoComprovada

        const compradorUpdate = await this.repository.update(id, comprador);
        return this.toCompradorResponseDto(compradorUpdate)
    }

    async findOne(id: string) {
        const comprador = await this.repository.findOne(id);
        if (!comprador) {
            throw new Error(`Comprador com ID ${id} não encontrado`);
        }
        const compradordto = this.toCompradorResponseDto(comprador);
        return compradordto;
    }


    async remove(id: string) {
        const comprador = await this.repository.findOne(id);
        if (!comprador) {
            throw new Error(`Comprador com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }


    private toCompradorResponseDto({ id, created_at, cpf, dataExpedicao, dataNascimento, numDocumento, email, endereco, estadoCivil, nome_mae, nome_pai, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada }: Comprador): CompradorResponseDto {
        return { id, created_at, cpf, dataExpedicao, dataNascimento, numDocumento, email, endereco, estadoCivil, nome_mae, nome_pai, formaPagamento, nacionalidade, nome, orgaoExpedidor, profissao, rendaComprovada, rendaNaoComprovada }
    }

}