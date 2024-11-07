import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { EmpreendedorFiadorService } from "../services/empreendedorFiador.service";


export class EmpreendedorFiadorController extends BaseController<EmpreendedorFiadorService> {
    constructor() {
        super(new EmpreendedorFiadorService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateImobiliariaRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Empreendedor e Fiador criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateImobiliariaRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Empreendedor e Fiador atualizado com sucesso", 200);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Empreendedor e Fiador encontrado com sucesso", 200);
    }

}
