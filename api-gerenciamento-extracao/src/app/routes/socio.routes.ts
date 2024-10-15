import { Router } from 'express';
import { CreateSocioController } from '../controllers/socio/create-socio.controller';
import { UpdateSocioController } from '../controllers/socio/update-socio.controller';

const socioRoutes = Router();
const createSocioController = new CreateSocioController();
const updateSocioController = new UpdateSocioController();

socioRoutes.post('/socio', createSocioController.createSocio.bind(createSocioController));
socioRoutes.patch('/socio/:id', updateSocioController.updateSocio.bind(updateSocioController));

export default socioRoutes;
