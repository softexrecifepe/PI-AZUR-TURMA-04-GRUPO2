import { Router, Request, Response, NextFunction } from 'express';
import { RepresentanteController } from "../controllers/representante.controller";


const representanteRoutes = Router();
const representanteController = new RepresentanteController();

representanteRoutes.post('/representante', representanteController.create.bind(representanteController));
representanteRoutes.patch('/representante/:id', representanteController.update.bind(representanteController));

export default representanteRoutes;