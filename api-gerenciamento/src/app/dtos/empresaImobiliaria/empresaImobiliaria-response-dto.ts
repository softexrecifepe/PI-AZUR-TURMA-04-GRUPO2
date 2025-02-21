import { Endereco } from "../../models/endereco.model";
import { Socio } from "../../models/socio.model";

export type ImobiliariaResponseDto = {

    id: string,
    created_at: Date,
    nomeImobiliaria: string;
    cnpj: string;
    email: string;
    numNire: string;
    dataSessao: Date;
    endereco: Endereco;
    socio: Socio;
}