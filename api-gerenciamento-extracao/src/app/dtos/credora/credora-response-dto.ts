import z from "zod";
import { AbstractDTO } from "../abstract.dto";
// import { Endereco } from "../../models/endereco.model";
// import { Representante } from "../../models/representante.model";


export type CredoraResponseDto = {
  
    id: string;
    created_at: Date;
    nomeCredora: string;
    nomeDoravante: string;
    cnpj: string;
}

