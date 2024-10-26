import { CreateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/create-aquisicaoImovel-request-dto";
import { AquisicaoImovelResponseDto } from "../dtos/aquisicao-imovel/aquisicaoImovel-response-dto";
import { UpdateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/update-aquisicaoImovel-request-dto";
import { AquisicaoImovel } from "../models/aquisicao-imovel.model";
import { AquisicaoImovelRepository } from "../repositories/aquisicao-imovel.repository";

export class AquisicaoImovelService {
    private repository: AquisicaoImovelRepository;

    constructor() {
        this.repository = new AquisicaoImovelRepository();
    }

    async create(dto: CreateAquisicaoImovelRequestDto){
        const data = dto.getAll();

        const aquisicaoImovel = new AquisicaoImovel();
        aquisicaoImovel.attSaldoDevedor = data.attSaldoDevedor;
        aquisicaoImovel.financiamentoCredora = data.financiamentoCredora;
        //aquisicaoImovel.imovel.getId = data.imovel.id;
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
        if (!aquisicaoImovel) throw new Error('Aquisição do Imóvel não encontrada');

        Object.assign(aquisicaoImovel, dto.getAll());
        const aquisicaoImovelUpdate = await this.repository.update(id, aquisicaoImovel);
        return this.toAquisicaoImovelResponseDto(aquisicaoImovelUpdate);

    }

    private toAquisicaoImovelResponseDto({ id, created_at, valorAquisicao, recursosProprios, recursosFGTS, financiamentoCredora, origemRecursos, normaRegulamentadora, valorAcessorias, valorDivida, valorLeilao, sistemaAmortizacao, attSaldoDevedor}: AquisicaoImovel): AquisicaoImovelResponseDto {
        return { id, created_at, valorAquisicao, recursosProprios, recursosFGTS, financiamentoCredora, origemRecursos, normaRegulamentadora, valorAcessorias, valorDivida, valorLeilao, sistemaAmortizacao, attSaldoDevedor };
    }
}