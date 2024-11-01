import { Endereco } from "../../models/endereco.model";

export type ImovelResponseDto = {
    id: string;
    created_at: Date;
    //endereco: Endereco,
    caracteristica: string,
    areaConstruida: number,
    areaPrivada: number,
    areaComum: number
}