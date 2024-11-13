import { Router, Request, Response, NextFunction } from 'express';
import { EnderecoController } from '../controllers/endereco.controller';
import { authenticateJWT } from '../middlewares/authenticate-jwt';


const enderecoRoutes = Router();
const enderecoController = new EnderecoController();

enderecoRoutes.get('/endereco/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.findOne.bind(enderecoController));

enderecoRoutes.get('/endereco', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.findAll.bind(enderecoController));

export default enderecoRoutes;