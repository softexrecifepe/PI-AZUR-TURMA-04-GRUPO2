import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller"; 
import { ImovelService } from "../services/imovel.service";
import { CreateImovelRequestDto } from "../dtos/imovel/create-imovel-request-dto";
import { UpdateImovelRequestDto } from "../dtos/imovel/update-imovel-request-dto";


export class ImovelController extends BaseController<ImovelService> {
    constructor() {
        super(new ImovelService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateImovelRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Imovel criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateImovelRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Imovel atualizado com sucesso", 200);
    }
  
    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Imovel encontrado com sucesso", 200);
    } 
     async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.remove(id), "Imovel removido com sucesso", 200);
    } 
     
}
