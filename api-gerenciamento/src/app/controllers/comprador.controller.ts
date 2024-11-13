import { Request, Response, NextFunction } from "express";
import { CompradorService } from "../services/comprador.service";
import { BaseController } from "./base/base.controller";

export class CompradorController extends BaseController<CompradorService>{
    constructor() {
        super(new CompradorService());
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Usuário Comprador encontrado com sucesso", 200);
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.handleRequest(req, res, next, async () => this.service.findAll(), "");
 
    }

}