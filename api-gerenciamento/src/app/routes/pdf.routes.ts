import { Router, Request, Response, NextFunction } from 'express';
import { PdfController } from '../controllers/pdf.controller';

const pdfRoutes = Router();
const pdfController = new PdfController();

pdfRoutes.get('/generate-pdf/:vendedorId', (req: Request, res: Response, next: NextFunction) => {
    pdfController.generatePdf(req, res, next);
});

export default pdfRoutes;
