import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { IncorporadoraService } from "../services/incorporadora.service";


export class IncorporadoraController extends BaseController<IncorporadoraService> {
    constructor() {
        super(new IncorporadoraService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateImobiliariaRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Incorporadora criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateImobiliariaRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Incorporadora atualizado com sucesso", 200);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Incorporadora encontrado com sucesso", 200);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => {
            await this.service.remove(id);
        }, "Incorporadora removido com sucesso", 200);
    }

}
