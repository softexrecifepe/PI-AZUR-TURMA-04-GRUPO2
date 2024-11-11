import { Router, Request, Response, NextFunction } from "express";
import { CredoraController } from "../controllers/credora.controller";
import { authenticateJWT } from "../middlewares/authenticate-jwt";


const credoraRoutes = Router();
const credoraController = new CredoraController();

credoraRoutes.post('/credora', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), credoraController.create.bind(credoraController));
credoraRoutes.patch('/credora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), credoraController.update.bind(credoraController));
credoraRoutes.get('/credora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), credoraController.findOne.bind(credoraController));
credoraRoutes.delete('/credora/:id', ((req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next)
}), credoraController.remove.bind(credoraController));

export default credoraRoutes;

