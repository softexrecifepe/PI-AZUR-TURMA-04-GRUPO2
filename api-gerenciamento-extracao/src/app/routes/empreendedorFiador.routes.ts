import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { EmpreendedorFiadorController } from '../controllers/empreendedorFiador.controller';

const empreendedorFiadorRoutes = Router();
const empreendedorFiadorController = new EmpreendedorFiadorController();

empreendedorFiadorRoutes.post('/empreendedorFiador', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.create.bind(empreendedorFiadorController));
empreendedorFiadorRoutes.patch('/empreendedorFiador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.update.bind(empreendedorFiadorController));
empreendedorFiadorRoutes.get('/empreendedorFiador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.findOne.bind(empreendedorFiadorController));
empreendedorFiadorRoutes.delete('/empreendedorFiador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), empreendedorFiadorController.remove.bind(empreendedorFiadorController));

export default empreendedorFiadorRoutes;
