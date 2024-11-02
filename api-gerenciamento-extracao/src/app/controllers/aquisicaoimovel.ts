import { Request, Response, NextFunction } from "express";
import { AquisicaoImovelService } from "../services/aquisicao-imovel.service";
import { BaseController } from "./base/base.controller";
import { CreateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/create-aquisicaoImovel-request-dto";
import { UpdateAquisicaoImovelRequestDto } from "../dtos/aquisicao-imovel/update-aquisicaoImovel-request-dto";

export class AquisicaoController extends BaseController<AquisicaoImovelService>{
    constructor() {
        super(new AquisicaoImovelService());
    }

    async create(req: Request, res: Response, next: NextFunction){
        const dto = new CreateAquisicaoImovelRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Aquisição Imóvel criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateAquisicaoImovelRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Aquisição Imóvel atualizado com sucesso");
    }
    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Aquisição Imóvel encontrado com sucesso");
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.remove(id), "Aquisição Imóvel removido com sucesso");
    }
}