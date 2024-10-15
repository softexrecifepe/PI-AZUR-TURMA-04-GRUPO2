import { UpdateSocioRequestDto } from "../../dtos/socio/update-socio-request-dto";
import { UpdateSocioResponseDto } from "../../dtos/socio/update-socio-response-dto";
import { DuplicateEntryError } from "../../errors/database.error";
import { Request, Response, NextFunction } from "express";
import { UpdateSocioService } from "../../services/socio/update-socio.service";

export class UpdateSocioController {
    private socioServiceUpdate: UpdateSocioService;

    constructor() {
        this.socioServiceUpdate = new UpdateSocioService();
    }

    async updateSocio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params
            const data = new UpdateSocioRequestDto({
                ...req.body
            })
            const socio = await this.socioServiceUpdate.execute(Number(id), data);
            const response: UpdateSocioResponseDto = this.mapToCreateSocioResponse(socio);
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

    private mapToCreateSocioResponse(socio: any): UpdateSocioResponseDto {
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