import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { ConstrutoraFiadoraService } from "../services/construtoraFiadora.service";


export class ConstrutoraFiadoraController extends BaseController<ConstrutoraFiadoraService> {
    constructor() {
        super(new ConstrutoraFiadoraService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateImobiliariaRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Construtora e Fiadora criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateImobiliariaRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Construtora e Fiadora atualizado com sucesso", 200);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Construtora e Fiadora encontrado com sucesso");
    }

}
