import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './app/config/api-docs/swagger.json'

import socioRoutes from './app/routes/socio.routes';
import representanteRoutes from './app/routes/representante.routes';
import {responseError} from './app/middlewares/response-error';
import enderecoRoutes from './app/routes/endereco.routes';
import imovelRoutes from './app/routes/imovel.routes';
import vendedorRoutes from './app/routes/vendedor.routes';
import incorporadoraRoutes from './app/routes/incorporadora.routes';
import empreendedorFiadorRoutes from './app/routes/empreendedorFiador.routes';
import credoraRoutes from './app/routes/credora.routes';
import construtoraFiadoraRoutes from './app/routes/construtoraFiadora.routes';
import compradorRoutes from './app/routes/comprador.routes';
import aquisicaoImovelRoutes from './app/routes/aquisicaoimovel.routes';
 
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/extracao', socioRoutes);
app.use('/api/extracao', representanteRoutes);
app.use('/api/extracao', enderecoRoutes);
app.use('/api/extracao', imovelRoutes);
app.use('/api/extracao', vendedorRoutes);
app.use('/api/extracao', incorporadoraRoutes);
app.use('/api/extracao', empreendedorFiadorRoutes);
app.use('/api/extracao', credoraRoutes);
app.use('/api/extracao', construtoraFiadoraRoutes);
app.use('/api/extracao', compradorRoutes);
app.use('/api/extracao', aquisicaoImovelRoutes);


app.get("terms", (req: Request, res: Response) => {
    res.json({
        message: "Termos de Serviço"
    })
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    responseError(error, req, res, next)
});

 
export default app;