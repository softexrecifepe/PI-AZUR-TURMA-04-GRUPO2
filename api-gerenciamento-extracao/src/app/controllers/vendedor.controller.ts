import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { VendedorService } from "../services/vendedor.service";
import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";


export class VendedorController extends BaseController<VendedorService> {
    constructor() {
        super(new VendedorService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateImobiliariaRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Vendedor criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateImobiliariaRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Vendedor atualizado com sucesso", 200);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Vendedor encontrado com sucesso");
    }

}
