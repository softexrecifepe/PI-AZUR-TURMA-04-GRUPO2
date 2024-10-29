import { comprador } from "../../models/comprador.model";

export type CreateCompradorRequestDto = {
    nome: string;
    nacionalidade: string;
    dataNascimento: Date;
    profissao: string;
    filiacao: string;
    email: string;
    documento: string;
    orgaoExpedidor: string;
    dataExpedicao: Date;
    cpf: string;
    estadoCivil: string;
    endereco: string;
    formaPagamento: string;
    rendaComprovada: number;
    rendaNaoComprovada: number;
}