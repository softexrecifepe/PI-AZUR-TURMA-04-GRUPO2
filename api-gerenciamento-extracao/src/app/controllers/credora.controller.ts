import { Request, Response, NextFunction } from "express";
import { CredoraService } from "../services/credora.service";
import { BaseController } from "./base/base.controller";
import { CreateCredoraRequestDto } from "../dtos/credora/create-credora-request-dto";
import { UpdateCredoraRequestDto } from "../dtos/credora/update-credora-request-dto";

export class CredoraController extends BaseController <CredoraService>{
    constructor(){
        super(new CredoraService());
    }

    async create(req: Request, res: Response, next: NextFunction){
        const dto = new CreateCredoraRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Credora criada com sucesso!");
    }

    async update(req: Request, res: Response, next: NextFunction){
        const dto = new UpdateCredoraRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Credora atualizada com sucesso!!", 200);

    }

    

}