import { CreateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/create-aquisicaoImovel-request-dto";
import { AquisicaoImovelResponseDto } from "../dtos/aquisicao-imovel/aquisicaoImovel-response-dto";
import { UpdateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/update-aquisicaoImovel-request-dto";
import { AquisicaoImovel } from "../models/aquisicao-imovel.model";
import { AquisicaoImovelRepository } from "../repositories/aquisicao-imovel.repository";
import { ImovelRepository } from "../repositories/imovel.repository";
import { NotFoundError } from "../errors/not-found.error";

export class AquisicaoImovelService {
    private repository: AquisicaoImovelRepository;

    constructor() {
        this.repository = new AquisicaoImovelRepository();
    }

    async create(dto: CreateAquisicaoImovelRequestDto) {
        const data = dto.getAll();

        const imovelRepository = new ImovelRepository();
        const imovel = await imovelRepository.findOne(data.imovelId)

        if (!imovel) throw new NotFoundError("Imóvel não encontrado")


        const aquisicaoImovel = new AquisicaoImovel();
        aquisicaoImovel.imovel = imovel;
        aquisicaoImovel.attSaldoDevedor = data.attSaldoDevedor;
        aquisicaoImovel.financiamentoCredora = data.financiamentoCredora;
        aquisicaoImovel.normaRegulamentadora = data.normaRegulamentadora;
        aquisicaoImovel.origemRecursos = data.origemRecursos;
        aquisicaoImovel.recursosFGTS = data.recursosFGTS;
        aquisicaoImovel.recursosProprios = data.recursosProprios;
        aquisicaoImovel.sistemaAmortizacao = data.sistemaAmortizacao;
        aquisicaoImovel.valorAcessorias = data.valorAcessorias;
        aquisicaoImovel.valorAquisicao = data.valorAquisicao
        aquisicaoImovel.valorDivida = data.valorDivida;
        aquisicaoImovel.valorLeilao = data.valorLeilao;

        const aquisicaoImovelcreate = await this.repository.create(aquisicaoImovel);
        return this.toAquisicaoImovelResponseDto(aquisicaoImovelcreate);

    }

    async update(id: string, dto: UpdateAquisicaoImovelRequestDto) {
        const aquisicaoImovel = await this.repository.findOne(id);
        if (!aquisicaoImovel) throw new NotFoundError('Aquisição do Imóvel não encontrada');

        const data = dto.getAll();

        // Se o ID de imóvel for fornecido no DTO, atualize o endereço da aquisição do imóvel
        if (data.imovelId) {
            const imovelRepository = new ImovelRepository();
            const imovel = await imovelRepository.findOne(data.imovelId);

            if (!imovel) throw new NotFoundError("Imóvel não encontrado");
            aquisicaoImovel.imovel = imovel;
        }

        // Atualize as demais propriedades do valor aquisição
        aquisicaoImovel.attSaldoDevedor = data.attSaldoDevedor ?? aquisicaoImovel.attSaldoDevedor;
        aquisicaoImovel.financiamentoCredora = data.financiamentoCredora ?? aquisicaoImovel.financiamentoCredora 
        aquisicaoImovel.normaRegulamentadora = data.normaRegulamentadora ?? aquisicaoImovel.normaRegulamentadora
        aquisicaoImovel.origemRecursos = data.origemRecursos ?? aquisicaoImovel.origemRecursos
        aquisicaoImovel.recursosFGTS = data.recursosFGTS ?? aquisicaoImovel.recursosFGTS
        aquisicaoImovel.recursosProprios = data.recursosProprios ?? aquisicaoImovel.recursosProprios
        aquisicaoImovel.sistemaAmortizacao = data.sistemaAmortizacao ?? aquisicaoImovel.sistemaAmortizacao
        aquisicaoImovel.valorAcessorias = data.valorAcessorias ?? aquisicaoImovel.valorAcessorias
        aquisicaoImovel.valorAquisicao = data.valorAquisicao ?? aquisicaoImovel.valorAquisicao
        aquisicaoImovel.valorDivida = data.valorDivida ?? aquisicaoImovel.valorDivida
        aquisicaoImovel.valorLeilao = data.valorLeilao ?? aquisicaoImovel.valorLeilao

        const aquisicaoImovelUpdate = await this.repository.update(id, aquisicaoImovel);
        return this.toAquisicaoImovelResponseDto(aquisicaoImovelUpdate);
    }
    
    async findOne(id: string) {
        const aquisicao_imovel = await this.repository.findOne(id);
        if (!aquisicao_imovel) {
            throw new NotFoundError(`Aquisição Imóvel com ID ${id} não encontrado`);
        }
        const aquisicao_imoveldto = this.toAquisicaoImovelResponseDto(aquisicao_imovel);
        return aquisicao_imoveldto;
    }


    async remove(id: string) {
        const aquisicao_imovel = await this.repository.findOne(id);
        if (!aquisicao_imovel) {
            throw new NotFoundError(`Aquisição Imóvel com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    private toAquisicaoImovelResponseDto({ id, created_at, valorAquisicao, recursosProprios, recursosFGTS, financiamentoCredora, origemRecursos, normaRegulamentadora, valorAcessorias, valorDivida, valorLeilao, sistemaAmortizacao, attSaldoDevedor, imovel }: AquisicaoImovel): AquisicaoImovelResponseDto {
        return { id, created_at, valorAquisicao, recursosProprios, recursosFGTS, financiamentoCredora, origemRecursos, normaRegulamentadora, valorAcessorias, valorDivida, valorLeilao, sistemaAmortizacao, attSaldoDevedor, imovel };
    }
}