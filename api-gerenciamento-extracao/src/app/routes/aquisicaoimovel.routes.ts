import { Router, Request, Response, NextFunction } from "express";
import { AquisicaoController } from "../controllers/aquisicaoimovel.controller";
import { authenticateJWT } from "../middlewares/authenticate-jwt";

const aquisicaoImovelRoutes = Router();
const aquisicaoController = new AquisicaoController();

aquisicaoImovelRoutes.post('/aquisicaoImovel', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), aquisicaoController.create.bind(aquisicaoController));
aquisicaoImovelRoutes.patch('/aquisicaoImovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), aquisicaoController.update.bind(aquisicaoController));
aquisicaoImovelRoutes.get('/aquisicaoImovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), aquisicaoController.findOne.bind(aquisicaoController));
aquisicaoImovelRoutes.delete('/aquisicaoImovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), aquisicaoController.remove.bind(aquisicaoController));

export default aquisicaoImovelRoutes