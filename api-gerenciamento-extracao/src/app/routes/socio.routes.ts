import { Router } from 'express';
import { SocioController } from '../controllers/socio/socio.controller';

const socioRoutes = Router();
const socioController = new SocioController();

socioRoutes.post('/socio', socioController.create.bind(socioController));
socioRoutes.patch('/socio/:id', socioController.update.bind(socioController));

export default socioRoutes;
