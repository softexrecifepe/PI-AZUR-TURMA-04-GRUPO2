import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { IncorporadoraController } from '../controllers/incorporadora.controller';

const incorporadoraRoutes = Router();
const incorporadoraController = new IncorporadoraController();

incorporadoraRoutes.post('/incorporadora', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.create.bind(incorporadoraController));
incorporadoraRoutes.patch('/incorporadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.update.bind(incorporadoraController));
incorporadoraRoutes.get('/incorporadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.findOne.bind(incorporadoraController));
incorporadoraRoutes.delete('/incorporadora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), incorporadoraController.remove.bind(incorporadoraController));

export default incorporadoraRoutes;
