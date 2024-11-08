import { Router, Request, Response, NextFunction } from 'express';
import { ImovelController } from '../controllers/imovel.controller';
import { authenticateJWT } from '../middlewares/authenticate-jwt';


const imovelRoutes = Router();
const imovelController = new ImovelController();

imovelRoutes.post('/imovel', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), imovelController.create.bind(imovelController));
imovelRoutes.patch('/imovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), imovelController.update.bind(imovelController));
imovelRoutes.get('/imovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), imovelController.findOne.bind(imovelController));
imovelRoutes.delete('/imovel/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), imovelController.remove.bind(imovelController));


export default imovelRoutes;