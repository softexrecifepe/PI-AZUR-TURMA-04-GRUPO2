import { Endereco } from "../../models/endereco.model";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

export type CompradorResponseDto = {
    id: string;
    created_at: Date;
    nome: string;
    nacionalidade: string;
    dataNascimento: Date;
    profissao: string;
    nome_mae: string;
    nome_pai: string;
    email: string;
    numDocumento: string;
    orgaoExpedidor: string;
    dataExpedicao: Date;
    regimeComunhao: string;
    cpf: string;
    estadoCivil: EstadoCivil;
    endereco: Endereco;
    formaPagamento: string;
    rendaComprovada: number;
    rendaNaoComprovada: number;
}