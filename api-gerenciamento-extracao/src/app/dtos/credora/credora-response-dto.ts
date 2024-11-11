import { Representante } from "../../models/representante.model";
import { Endereco } from "../../models/endereco.model";

export type CredoraResponseDto = {
    id: string;
    created_at: Date;
    nomeCredora: string;
    nomeDoravante: string;
    cnpj: string;
    representante: Representante;
    endereco: Endereco
}

