import { Request, Response, NextFunction } from "express";
import { CompradorService } from "../services/comprador.service";
import { BaseController } from "./base/base.controller";
import { CreateCompradorRequestDto } from "../dtos/comprador/create-comprador-request-dto";
import { UpdateCompradorRequestDto } from "../dtos/comprador/update-comprador-request-dto";

export class CompradorController extends BaseController<CompradorService>{
    constructor() {
        super(new CompradorService());
    }

    async create(req: Request, res: Response, next: NextFunction){
        const dto = new CreateCompradorRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), " Usuário Comprador criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateCompradorRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Usuário Comprador atualizado com sucesso", 200);
    }
    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Usuário Comprador encontrado com sucesso", 200);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.remove(id), "Usuário Comprador removido com sucesso", 200);
    }
}