import { Router, Request, Response, NextFunction } from "express";
import { CompradorController } from "../controllers/comprador.controller";

const compradorRoutes = Router();
const compradorController = new CompradorController();

compradorRoutes.post('/comprador', compradorController.create.bind(compradorController));
compradorRoutes.patch('/comprador/:id', compradorController.update.bind(compradorController));
compradorRoutes.get('/comprador/:id', compradorController.findOne.bind(compradorController));
compradorRoutes.delete('/comprador/:id', compradorController.remove.bind(compradorController));

export default compradorRoutes;