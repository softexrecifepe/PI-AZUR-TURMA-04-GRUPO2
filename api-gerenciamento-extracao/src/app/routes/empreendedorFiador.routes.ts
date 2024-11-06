import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { EmpreendedorFiadorController } from '../controllers/empreendedorFiador.controller';

const socioRoutes = Router();
const empreendedorFiadorController = new EmpreendedorFiadorController();

socioRoutes.post('/empreendedorFiador', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.create.bind(empreendedorFiadorController));
socioRoutes.patch('/empreendedorFiador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.update.bind(empreendedorFiadorController));
socioRoutes.get('/empreendedorFiador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.findOne.bind(empreendedorFiadorController));

export default socioRoutes;
