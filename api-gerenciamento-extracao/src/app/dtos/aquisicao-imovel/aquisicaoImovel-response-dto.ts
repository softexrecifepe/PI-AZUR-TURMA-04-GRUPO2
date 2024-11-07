import { Imovel } from "../../models/imovel.model";

export type AquisicaoImovelResponseDto = {
    id: string;
    created_at: Date;
    valorAquisicao: number;
    recursosProprios: number;
    recursosFGTS: number;
    financiamentoCredora: number;
    origemRecursos: string;
    normaRegulamentadora: string;
    valorAcessorias: number;
    valorDivida: number;
    valorLeilao: number;
    sistemaAmortizacao: string;
    attSaldoDevedor: number;
    imovel: Imovel;
}