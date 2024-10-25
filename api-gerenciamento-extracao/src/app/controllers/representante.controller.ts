import { Request, Response, NextFunction } from "express";
import { RepresentanteService } from "../services/representante.service";
import { BaseController } from "./base/base.controller"; 
import { CreateRepresentanteRequestDto } from "../dtos/representante/create-representante-request-dto";
import { UpdateRepresentanteRequestDto } from "../dtos/representante/update-representante-request-dto";

export class RepresentanteController extends BaseController<RepresentanteService> {
    constructor() {
        super(new RepresentanteService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateRepresentanteRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Representante criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateRepresentanteRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Representante atualizado com sucesso");
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Representante encontrado com sucesso");
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.remove(id), "Representante removido com sucesso");
    }


}
