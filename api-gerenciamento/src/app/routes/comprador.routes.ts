import { Router, Request, Response, NextFunction } from "express";
import { CompradorController } from "../controllers/comprador.controller";
import { authenticateJWT } from "../middlewares/authenticate-jwt";

const compradorRoutes = Router();
const compradorController = new CompradorController();


compradorRoutes.get('/comprador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.findOne.bind(compradorController));

compradorRoutes.get('/comprador', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.findAll.bind(compradorController));

export default compradorRoutes;