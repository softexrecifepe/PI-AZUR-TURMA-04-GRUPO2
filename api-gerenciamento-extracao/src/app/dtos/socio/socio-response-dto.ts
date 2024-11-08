import { Endereco } from "../../models/endereco.model";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

export type SocioResponseDto = {
    id: string;
    created_at: Date;
    nome: string;
    nacionalidade: string;
    dataNascimento: Date;
    profissao: string;
    email: string;
    numDocumento: string;
    dataExpedicao: Date;
    orgaoExpedidor: string;
    regimeComunhao: string;
    cpf: string;
    estadoCivil: EstadoCivil;
    nome_mae: string;
    nome_pai?: string;
    endereco: Endereco;
}