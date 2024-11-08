import { Router, Request, Response, NextFunction } from 'express';
import { RepresentanteController } from "../controllers/representante.controller";
import { authenticateJWT } from '../middlewares/authenticate-jwt';


const representanteRoutes = Router();
const representanteController = new RepresentanteController();

representanteRoutes.post('/representante', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), representanteController.create.bind(representanteController));
representanteRoutes.patch('/representante/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), representanteController.update.bind(representanteController));
representanteRoutes.get('/representante/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), representanteController.findOne.bind(representanteController));
representanteRoutes.delete('/representante/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), representanteController.remove.bind(representanteController));
representanteRoutes.get('/representante', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), representanteController.findAll.bind(representanteController));


export default representanteRoutes;