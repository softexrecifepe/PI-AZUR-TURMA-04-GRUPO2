import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { VendedorController } from '../controllers/vendedor.controller';

const vendedorRoutes = Router();
const vendedorController = new VendedorController();

vendedorRoutes.get('/vendedor/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), vendedorController.findOne.bind(vendedorController));

vendedorRoutes.get('/vendedor', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), vendedorController.findAll.bind(vendedorController));

export default vendedorRoutes;
