import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { ConstrutoraFiadoraController } from '../controllers/construtoraFiadora.controller';

const construtoraFiadoraRoutes = Router();
const construtoraFiadoraController = new ConstrutoraFiadoraController();

construtoraFiadoraRoutes.post('/construtoraFiadora', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.create.bind(construtoraFiadoraController));
construtoraFiadoraRoutes.patch('/construtoraFiadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.update.bind(construtoraFiadoraController));
construtoraFiadoraRoutes.get('/construtoraFiadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.findOne.bind(construtoraFiadoraController));
construtoraFiadoraRoutes.delete('/construtoraFiadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), construtoraFiadoraController.remove.bind(construtoraFiadoraController));

export default construtoraFiadoraRoutes;
