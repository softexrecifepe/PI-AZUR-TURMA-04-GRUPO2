import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { SocioService } from "../services/socio.service"; 


export class SocioController extends BaseController<SocioService> {
    constructor() {
        super(new SocioService());
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Sócio encontrado com sucesso", 200);
    }
    
    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.handleRequest(req, res, next, async () => this.service.findAll(), "");
 
    }

}
