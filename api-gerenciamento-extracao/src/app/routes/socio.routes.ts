import { Router, Request, Response, NextFunction } from 'express';
import { SocioController } from '../controllers/socio.controller';
import { authenticateJWT } from '../middlewares/authenticate-jwt';

const socioRoutes = Router();
const socioController = new SocioController();

socioRoutes.post('/socio', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.create.bind(socioController));
socioRoutes.patch('/socio/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.update.bind(socioController));
socioRoutes.get('/socio/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.findOne.bind(socioController));
socioRoutes.delete('/socio/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.remove.bind(socioController));

export default socioRoutes;
