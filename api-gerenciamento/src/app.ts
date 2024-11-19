import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseError } from './app/middlewares/response-error';
import socioRoutes from './app/routes/socio.routes';
import enderecoRoutes from './app/routes/endereco.routes';
import vendedorRoutes from './app/routes/vendedor.routes';
import compradorRoutes from './app/routes/comprador.routes';
import pdfRoutes from './app/routes/pdf.routes';
 
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/gerenciamento', socioRoutes);
app.use('/api/gerenciamento', enderecoRoutes);
app.use('/api/gerenciamento', vendedorRoutes);
app.use('/api/gerenciamento', compradorRoutes);
app.use('/api/pdf', pdfRoutes);


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    responseError(error, req, res, next)
});

 
export default app;