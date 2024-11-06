import { Router, Request, Response, NextFunction } from 'express';
import { EnderecoController } from '../controllers/endereco.controller';


const enderecoRoutes = Router();
const enderecoController = new EnderecoController();

enderecoRoutes.post('/endereco', enderecoController.create.bind(enderecoController));
enderecoRoutes.patch('/endereco/:id', enderecoController.update.bind(enderecoController));
enderecoRoutes.get('/endereco/:id', enderecoController.findOne.bind(enderecoController));
enderecoRoutes.delete('/endereco/:id', enderecoController.remove.bind(enderecoController));


export default enderecoRoutes;