import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './app/config/swagger.json'

import socioRoutes from './app/routes/socio.routes';

import {responseError} from './app/middlewares/response-error';
 
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api', socioRoutes);


app.get("terms", (req: Request, res: Response) => {
    res.json({
        message: "Termos de Serviço"
    })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    responseError(error, req, res, next)
});

 
export default app;