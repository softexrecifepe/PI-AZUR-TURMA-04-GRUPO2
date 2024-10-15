import { CreateSocioRequestDto } from "../../dtos/socio/create-socio-request-dto";
import { CreateSocioResponseDto } from "../../dtos/socio/create-socio-response-dto";
import { UpdateSocioRequestDto } from "../../dtos/socio/update-socio-request-dto";
import { DuplicateEntryError } from "../../errors/database.error";
import { CreateSocioService } from "../../services/socio/create-socio.service";
import { Request, Response, NextFunction } from "express";

export class CreateSocioController {
    private socioServiceCreate: CreateSocioService;

    constructor() {
        this.socioServiceCreate = new CreateSocioService();
    }

    async createSocio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = new CreateSocioRequestDto({
                ...req.body
            })
            const socio = await this.socioServiceCreate.execute(data);
            const response: CreateSocioResponseDto = this.mapToCreateSocioResponse(socio);
            res.status(201).json({
                status: 'success',
                data: response,
                message: 'Sócio criado com sucesso'
            });
        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new DuplicateEntryError('Dado duplicado');
            }
            return next(error);
        }
    }

    private mapToCreateSocioResponse(socio: any): CreateSocioResponseDto {
        return {
            id: socio.id,
            nome: socio.nome,
            nacionalidade: socio.nacionalidade,
            dataNascimento: socio.dataNascimento,
            profissao: socio.profissao,
            email: socio.email,
            numeroCarteiraFuncional: socio.numeroCarteiraFuncional,
            dataExpedicaoCREA: socio.dataExpedicaoCREA,
            cpf: socio.cpf,
            estadoCivil: socio.estadoCivil,
            nome_mae: socio.nome_mae,
            nome_pai: socio.nome_pai || undefined,
        };
    }
}

