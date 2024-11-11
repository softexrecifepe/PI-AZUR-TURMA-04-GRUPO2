import { Router, Request, Response, NextFunction } from 'express';
import { EnderecoController } from '../controllers/endereco.controller';
import { authenticateJWT } from '../middlewares/authenticate-jwt';


const enderecoRoutes = Router();
const enderecoController = new EnderecoController();

enderecoRoutes.post('/endereco', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.create.bind(enderecoController));
enderecoRoutes.patch('/endereco/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.update.bind(enderecoController));
enderecoRoutes.get('/endereco/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.findOne.bind(enderecoController));
enderecoRoutes.delete('/endereco/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.remove.bind(enderecoController));
enderecoRoutes.get('/endereco', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), enderecoController.findAll.bind(enderecoController));

export default enderecoRoutes;