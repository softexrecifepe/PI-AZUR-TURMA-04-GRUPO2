import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { IncorporadoraController } from '../controllers/incorporadora.controller';

const socioRoutes = Router();
const incorporadoraController = new IncorporadoraController();

socioRoutes.post('/incorporadora', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.create.bind(incorporadoraController));
socioRoutes.patch('/incorporadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.update.bind(incorporadoraController));
socioRoutes.get('/incorporadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.findOne.bind(incorporadoraController));

export default socioRoutes;
