import { Request, Response, NextFunction } from "express";
import { EnderecoService } from "../services/endereco.service";
import { BaseController } from "./base/base.controller"; 

export class EnderecoController extends BaseController<EnderecoService> {
    constructor() {
        super(new EnderecoService());
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Representante encontrado com sucesso", 200);
    } 

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.handleRequest(req, res, next, async () => this.service.findAll(), "Esses são todos os representantes");
 
    }
     
}
