import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

export type RepresentanteResponseDTO = {
    id: string;
    created_at: Date;
    nome: string;
    nacionalidade: string;
    dataNascimento: Date;
    profissao: string;
    cpf: string;
    estadoCivil: EstadoCivil;
    numDocumento: string;
    dataExpedicao: Date;
}