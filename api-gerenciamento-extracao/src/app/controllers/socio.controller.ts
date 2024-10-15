import { CreateSocioRequestDto } from "../dtos/socio/create-socio-request-dto";
import { CreateSocioResponseDto } from "../dtos/socio/create-socio-response-dto";
import { CreateSocioService } from "../services/socio/create-socio.service";
import { Request, Response, NextFunction } from "express";

export class SocioController {
    private socioServiceCreate: CreateSocioService;

    constructor() {
        this.socioServiceCreate = new CreateSocioService();
    }

    async createSocio(req: Request, res: Response, next: NextFunction) {
        try {
            const data = new CreateSocioRequestDto({
                ...req.body
            })
            const socio = await this.socioServiceCreate.execute(data);
            res.status(201).json(socio);
        } catch (error) {
            return next(error);
        }
    }
}

// const output: CreateSocioResponseDto = {
//     id: socio.id,
//     nome: socio.nome,
//     nacionalidade: socio.nacionalidade,
//     dataNascimento: socio.dataNascimento,
//     profissao: socio.profissao,
//     email: socio.email,
//     numeroCarteiraFuncional: socio.numeroCarteiraFuncional,
//     dataExpedicaoCREA: socio.dataExpedicaoCREA,
//     cpf: socio.cpf,
//     estadoCivil: socio.estadoCivil,
//     nome_mae: socio.nome_mae,
//     nome_pai: socio.nome_pai
// };

