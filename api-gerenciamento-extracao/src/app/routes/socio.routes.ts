import { Router } from 'express';
import { SocioController } from '../controllers/socio.controller';

const socioRoutes = Router();
const socioController = new SocioController();

socioRoutes.post('/socio', socioController.createSocio.bind(socioController));

export default socioRoutes;
