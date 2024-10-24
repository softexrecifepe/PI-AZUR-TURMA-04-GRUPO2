import { Router, Request, Response, NextFunction } from "express";
import { CredoraController } from "../controllers/credora.controller";


const credoraRoutes = Router();
const credoraController = new CredoraController();

credoraRoutes.post('/credora', credoraController.create.bind(credoraController));
credoraRoutes.patch('/credora/:id', credoraController.update.bind(credoraController));

export default credoraRoutes;

