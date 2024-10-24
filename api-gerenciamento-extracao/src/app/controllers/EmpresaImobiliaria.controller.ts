import { Request, Response, NextFunction } from "express";
import { EmpresaImobiliariaService } from "../services/empresaImobiliaria.service";
import { BaseController } from "./base/base.controller";
import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { assert } from "console";


export class EmpresaImobiliariaController extends BaseController <EmpresaImobiliariaService> {

    constructor(){
        super(new EmpresaImobiliariaService());
    }

    async create (req: Request, res: Response, next: NextFunction){
        const dto = new CreateImobiliariaRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Empresa imobiliária criada com sucesso!");
    }

    async update(req: Request, res: Response, next: NextFunction){
        const id = req.params.id;
        const dto = new UpdateImobiliariaRequestDto({
            ...req.body
        });

        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Empresa imobiliária alterada com sucesso!");

    }


}