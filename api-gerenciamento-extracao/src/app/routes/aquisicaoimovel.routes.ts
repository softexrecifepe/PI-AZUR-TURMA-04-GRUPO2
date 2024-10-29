import { Router, Request, Response, NextFunction } from "express";
import { AquisicaoController } from "../controllers/aquisicaoimovel";

const aquisicaoImovelRoutes = Router();
const aquisicaoController = new AquisicaoController();

aquisicaoImovelRoutes.post('/aquisicaoImovel', aquisicaoController.create.bind(aquisicaoController));
aquisicaoImovelRoutes.patch('/aquisicaoImovel/:id', aquisicaoController.update.bind(aquisicaoController));

export default aquisicaoImovelRoutes