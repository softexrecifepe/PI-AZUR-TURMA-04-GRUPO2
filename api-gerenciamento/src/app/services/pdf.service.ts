import PDFDocument from 'pdfkit';
import { Response } from 'express';
import path from 'path';
import { VendedorService } from './vendedor.service';

export class PdfGenerator {
  constructor(private vendedorService: VendedorService) {}

  async generateContractPdf(res: Response, vendedorId: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 60 });

    // Busca os dados do vendedor pelo ID
    const vendedorData = await this.vendedorService.findOne(vendedorId);

    const { nomeImobiliaria, cnpj, endereco, socio } = vendedorData;

    const logoPath = path.resolve(__dirname, '../images/logomarca.png');
    doc.pipe(res);

    const addFooter = () => {
       // Largura da imagem desejada
      const imageWidth = 200;

      // Calcula a posição X para centralizar a imagem
      const centerX = (doc.page.width - imageWidth) / 2;

      // Define a altura da imagem
      const footerHeight = 720; // Ajuste conforme necessário

      // Adiciona a imagem ao documento
      doc.image(logoPath, centerX, footerHeight, { width: imageWidth });
    };

    doc.on('pageAdded', () => {
      addFooter();
    });

    const regularFont = path.resolve(__dirname, '../fonts/Roboto-Regular.ttf');
    const boldFont = path.resolve(__dirname, '../fonts/Roboto-Bold.ttf');

    // Cabeçalho do contrato
    doc.font(boldFont).fontSize(10).text('INSTRUMENTO PARTICULAR DE PROMESSA DE COMPRA E VENDA', { align: 'center' });
    doc.moveDown(1);
    doc.font(boldFont).fontSize(10).text('RESERVA DAS PALMEIRAS | CL108QIII', { align: 'center' });
    doc.moveDown(2);

    // Seção PARTES (dados dinâmicos)
    doc.font(boldFont).fontSize(10).text('PARTES');
    doc.moveDown(1);

    const vendedorEndereco = `${endereco.rua}, nº ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, CEP ${endereco.cep}`;
    const socioEndereco = `${socio.endereco.rua}, nº ${socio.endereco.numero}, ${socio.endereco.bairro}, ${socio.endereco.cidade} - ${socio.endereco.estado}, CEP ${socio.endereco.cep}`;

    doc.font(regularFont).fontSize(10).text(
      `${nomeImobiliaria}, pessoa jurídica de direito privado, inscrita no CNPJ/ME sob o nº ${cnpj}, ` +
      `com sede na ${vendedorEndereco}, neste ato representada por seu sócio ${socio.nome}, ` +
      `portador do documento nº ${socio.numDocumento} e inscrito no CPF sob o nº ${socio.cpf}, ` +
      `com endereço profissional na ${socioEndereco}, doravante denominada "Vendedora".`,
      { lineGap: doc.currentLineHeight() * 0.75, align: 'justify' }
    );

    //doc.moveDown(2);

    // Exemplo para incluir outras partes do texto com formatação
    doc.font(regularFont).fontSize(10).text(
      'Comprador, como será qualificado no Anexo 1, com pessoa(s) física(s) e ou jurídica(s) indicada(s) e qualificada(s) no item 2.2 do ANEXO 1 - ' +
      'QUADRO RESUMO que é parte integrante deste instrumento.'
      , {
        lineGap: doc.currentLineHeight() * 0.75, // Define espaçamento de 1.5 linhas
        align: 'justify' 
      });
    doc.moveDown(2);

    // Seção ITENS
    doc.font(boldFont).fontSize(10).text('ITENS');
    doc.moveDown(1);

    doc.font(regularFont).fontSize(10).text(
      'As partes contratantes, na final assinadas, tendo tido conhecimento prévio do texto deste INSTRUMENTO PARTICULAR DE PROMESSA ' +
      'DE COMPRA E VENDA (“Contrato”) e entendido o seu sentido e alcance, têm justa e acordada promessa de compra e venda de unidade ' +
      'imobiliária, descrita e caracterizada neste instrumento e indicada no item 3 do ANEXO 1 - QUADRO RESUMO que é parte integrante ' +
      'deste instrumento, regulando-se neste negócio pelas seguintes cláusulas e condições aceitas e outorgadas.'
      , {
        lineGap: doc.currentLineHeight() * 0.75, // Define espaçamento de 1.5 linhas
        align: 'justify' 
      });
    doc.moveDown(2);

    // Seção 1 DAS DISPOSIÇÕES INICIAIS
    doc.font(boldFont).fontSize(10).text('1 DAS DISPOSIÇÕES INICIAIS');
    doc.moveDown(1);

    doc.font(regularFont).fontSize(10).text(
      '1.1 - O Comprador declara que recebeu da Vendedora, previamente, a minuta do presente instrumento a fim de examiná-la e ' +
      'determinada ele incluir, usando a liberdade de se assessorar por advogado de sua confiança, ponderando o alcance das condições nele ' +
      'previstas, e se obrigando, caso concorde, com todas as condições, pontualmente, ao firmar esse contrato.'
      , {
        lineGap: doc.currentLineHeight() * 0.75, // Define espaçamento de 1.5 linhas
        align: 'justify' 
      });

    // Rodapé
    addFooter();

    doc.end();
  }
}
