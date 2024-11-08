import { Router, Request, Response, NextFunction } from "express";
import { CompradorController } from "../controllers/comprador.controller";
import { authenticateJWT } from "../middlewares/authenticate-jwt";

const compradorRoutes = Router();
const compradorController = new CompradorController();

compradorRoutes.post('/comprador', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.create.bind(compradorController));
compradorRoutes.patch('/comprador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.update.bind(compradorController));
compradorRoutes.get('/comprador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.findOne.bind(compradorController));
compradorRoutes.delete('/comprador/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), compradorController.remove.bind(compradorController));

export default compradorRoutes;