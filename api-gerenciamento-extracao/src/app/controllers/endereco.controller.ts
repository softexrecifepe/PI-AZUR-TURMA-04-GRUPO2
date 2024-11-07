import { Request, Response, NextFunction } from "express";
import { EnderecoService } from "../services/endereco.service";
import { BaseController } from "./base/base.controller"; 
import { CreateEnderecoRequestDto } from "../dtos/endereco/create-endereco-request-dto";
import { UpdateEnderecoRequestDto } from "../dtos/endereco/update-endereco-request-dto"; 

export class EnderecoController extends BaseController<EnderecoService> {
    constructor() {
        super(new EnderecoService());
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateEnderecoRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Endereço criado com sucesso");
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateEnderecoRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Endereço atualizado com sucesso", 200);
    }
  
    async findOne(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.findOne(id), "Representante encontrado com sucesso", 200);
    } 
     async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.remove(id), "Representante removido com sucesso", 200);
    } 
     
}
