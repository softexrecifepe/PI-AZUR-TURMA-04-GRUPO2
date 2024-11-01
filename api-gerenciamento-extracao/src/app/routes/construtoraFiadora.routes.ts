import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { ConstrutoraFiadoraController } from '../controllers/construtoraFiadora.controller';

const socioRoutes = Router();
const construtoraFiadoraController = new ConstrutoraFiadoraController();

socioRoutes.post('/construtoraFiadora', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.create.bind(construtoraFiadoraController));
socioRoutes.patch('/construtoraFiadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.update.bind(construtoraFiadoraController));
socioRoutes.get('/construtoraFiadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.findOne.bind(construtoraFiadoraController));

export default socioRoutes;
