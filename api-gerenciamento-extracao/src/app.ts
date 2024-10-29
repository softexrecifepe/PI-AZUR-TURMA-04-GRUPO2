import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import socioRoutes from './app/routes/socio.routes';
import representanteRoutes from './app/routes/representante.routes';
import {responseError} from './app/middlewares/response-error';
import enderecoRoutes from './app/routes/endereco.routes';
import imovelRoutes from './app/routes/imovel.routes';
 
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api', socioRoutes);
app.use('/api', representanteRoutes);
app.use('/api', enderecoRoutes)
app.use('/api', imovelRoutes)


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    responseError(error, req, res, next)
});

 
export default app;