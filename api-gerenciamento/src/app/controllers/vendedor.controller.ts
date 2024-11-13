import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { VendedorService } from "../services/vendedor.service";


export class VendedorController extends BaseController<VendedorService> {
    constructor() {
        super(new VendedorService());
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Vendedor encontrado com sucesso", 200);
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.handleRequest(req, res, next, async () => this.service.findAll(), "");
 
    }

}
