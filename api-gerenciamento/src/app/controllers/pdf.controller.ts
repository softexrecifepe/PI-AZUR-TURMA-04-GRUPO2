import { Request, Response, NextFunction } from 'express';
import { BaseController } from "./base/base.controller"; 
import { PdfGenerator } from '../services/pdf.service';
import { VendedorService } from '../services/vendedor.service';

export class PdfController extends BaseController<any> {
  constructor() {
    super(null); 
  }

  async generatePdf(req: Request, res: Response, next: NextFunction) {
    try {
      const { vendedorId } = req.params;

      if (!vendedorId) {
        throw new Error("O 'vendedorId' é obrigatório para gerar o PDF.");
      }

      // Configura o cabeçalho para download do PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=contract.pdf');
      const vendedorService = new VendedorService();
      const pdfGenerator = new PdfGenerator(vendedorService);
      // Chama o gerador de PDF, passando a resposta e o ID do vendedor
      await pdfGenerator.generateContractPdf(res, vendedorId);

    } catch (error) {
      next(error);
    }
  }
}
