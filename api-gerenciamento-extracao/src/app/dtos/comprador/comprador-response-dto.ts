import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

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
    estadoCivil: EstadoCivil;
    endereco: string;
    formaPagamento: string;
    rendaComprovada: number;
    rendaNaoComprovada: number;
}