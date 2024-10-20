import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base.controller";
import { SocioService } from "../../services/socio/socio.service"; 
import { CreateSocioRequestDto } from "../../dtos/socio/create-socio-request-dto";
import { UpdateSocioRequestDto } from "../../dtos/socio/update-socio-request-dto";


export class SocioController extends BaseController<SocioService> {
    constructor() {
        super(new SocioService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateSocioRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Sócio criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateSocioRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Sócio atualizado com sucesso");
    }
}
