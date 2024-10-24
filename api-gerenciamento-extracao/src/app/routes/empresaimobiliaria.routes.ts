import { Router, Request, Response, NextFunction } from "express";
import { EmpresaImobiliariaController } from "../controllers/EmpresaImobiliaria.controller";


const empresaRoutes = Router();
const empresaController = new EmpresaImobiliariaController();

empresaRoutes.post('/credora', empresaController.create.bind(empresaController));
empresaRoutes.patch('/credora/:id', empresaController.update.bind(empresaController));

export default empresaRoutes;

