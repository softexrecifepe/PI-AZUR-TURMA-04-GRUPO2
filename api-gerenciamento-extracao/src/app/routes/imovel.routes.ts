import { Router, Request, Response, NextFunction } from 'express';
import { ImovelController } from '../controllers/imovel.controller';


const imovelRoutes = Router();
const imovelController = new ImovelController();

imovelRoutes.post('/imovel', imovelController.create.bind(imovelController));
imovelRoutes.patch('/imovel/:id', imovelController.update.bind(imovelController));
imovelRoutes.get('/imovel/:id', imovelController.findOne.bind(imovelController));
imovelRoutes.delete('/imovel/:id', imovelController.remove.bind(imovelController));


export default imovelRoutes;