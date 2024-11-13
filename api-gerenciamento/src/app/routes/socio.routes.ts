import { Router, Request, Response, NextFunction } from 'express';
import { SocioController } from '../controllers/socio.controller';
import { authenticateJWT } from '../middlewares/authenticate-jwt';

const socioRoutes = Router();
const socioController = new SocioController();

socioRoutes.get('/socio/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.findOne.bind(socioController));

socioRoutes.get('/socio', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), socioController.findAll.bind(socioController));

export default socioRoutes;
