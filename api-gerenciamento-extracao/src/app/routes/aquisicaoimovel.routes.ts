import { Router, Request, Response, NextFunction } from "express";
import { AquisicaoController } from "../controllers/aquisicaoimovel";

const aquisicaoImovelRoutes = Router();
const aquisicaoController = new AquisicaoController();

aquisicaoImovelRoutes.post('/aquisicaoImovel', aquisicaoController.create.bind(aquisicaoController));
aquisicaoImovelRoutes.patch('/aquisicaoImovel/:id', aquisicaoController.update.bind(aquisicaoController));
aquisicaoImovelRoutes.get('/aquisicaoImovel/:id', aquisicaoController.findOne.bind(aquisicaoController));
aquisicaoImovelRoutes.delete('/aquisicaoImovel/:id', aquisicaoController.remove.bind(aquisicaoController));

export default aquisicaoImovelRoutes