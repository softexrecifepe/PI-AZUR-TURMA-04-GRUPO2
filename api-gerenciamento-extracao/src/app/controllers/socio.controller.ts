import { Request, Response, NextFunction } from "express";
import { BaseController } from "./base/base.controller";
import { SocioService } from "../services/socio.service"; 
import { CreateSocioRequestDto } from "../dtos/socio/create-socio-request-dto";
import { UpdateSocioRequestDto } from "../dtos/socio/update-socio-request-dto";


export class SocioController extends BaseController<SocioService> {
    constructor() {
        super(new SocioService());
    }

    /**
     * @swagger
     * /socios:
     *   post:
     *     summary: Cria um novo sócio
     *     tags: [Socios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/src/app/dtos/socio/CreateSocioRequestDto'
     *     responses:
     *       201:
     *         description: Sócio criado com sucesso
     *       400:
     *         description: Requisição inválida
     */
    async create(req: Request, res: Response, next: NextFunction) {
        const dto = new CreateSocioRequestDto({
            ...req.body
        });
        return this.handleRequest(req, res, next, async () => this.service.create(dto), "Sócio criado com sucesso");
    }

    /**
     * @swagger
     * /socios/{id}:
     *   patch:
     *     summary: Edita um sócio
     *     tags: [Socios]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do sócio a ser editado
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#./src/app/dtos/socio/UpdateSocioRequestDto'
     *     responses:
     *       200:
     *         description: Sócio atualizado com sucesso
     *       400:
     *         description: Requisição inválida
     *       404:
     *         description: Sócio não encontrado
     */
    async update(req: Request, res: Response, next: NextFunction) {
        const dto = new UpdateSocioRequestDto({
            ...req.body
        });
        const id = req.params.id;
        return this.handleRequest(req, res, next, async () => this.service.update(id, dto), "Sócio atualizado com sucesso", 200);
    }

}
