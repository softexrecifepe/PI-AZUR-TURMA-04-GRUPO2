import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authenticate-jwt';
import { VendedorController } from '../controllers/vendedor.controller';

const socioRoutes = Router();
const vendedorController = new VendedorController();

socioRoutes.post('/vendedor', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), vendedorController.create.bind(vendedorController));
socioRoutes.patch('/vendedor/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), vendedorController.update.bind(vendedorController));
socioRoutes.get('/vendedor/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), vendedorController.findOne.bind(vendedorController));

export default socioRoutes;
