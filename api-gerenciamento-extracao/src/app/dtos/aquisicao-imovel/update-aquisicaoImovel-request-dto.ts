import z from "zod";
import { AbstractDTO } from "../abstract.dto";

const updateAquisicaoImovelSchema = z.object({
  valorAquisicao: z.number()
    .positive("Valor de aquisição deve ser positivo")
    .max(9999999999.99, "Valor de aquisição é muito alto").optional(),
  
  recursosProprios: z.number()
    .positive("Recursos próprios devem ser positivos")
    .max(9999999999.99, "Recursos próprios são muito altos").optional(),

  recursosFGTS: z.number()
    .positive("Recursos do FGTS devem ser positivos")
    .max(9999999999.99, "Recursos do FGTS são muito altos").optional(),
  
  financiamentoCredora: z.number()
    .positive("Financiamento da credora deve ser positivo")
    .max(9999999999.99, "Financiamento da credora é muito alto").optional(),

  origemRecursos: z.string()
    .min(3, "Origem dos recursos é obrigatória")
    .max(255, "Origem dos recursos pode ter no máximo 255 caracteres").optional(),

  normaRegulamentadora: z.string()
    .min(3, "Norma regulamentadora é obrigatória")
    .max(255, "Norma regulamentadora pode ter no máximo 255 caracteres").optional(),

  valorAcessorias: z.number()
    .positive("Valor das assessorias deve ser positivo")
    .max(9999999999.99, "Valor das assessorias é muito alto").optional(),

  valorDivida: z.number()
    .positive("Valor da dívida deve ser positivo")
    .max(9999999999.99, "Valor da dívida é muito alto").optional(),

  valorLeilao: z.number()
    .positive("Valor do leilão deve ser positivo")
    .max(9999999999.99, "Valor do leilão é muito alto").optional(),

  sistemaAmortizacao: z.string()
    .min(3, "Sistema de amortização é obrigatório")
    .max(255, "Sistema de amortização pode ter no máximo 255 caracteres").optional(),

  attSaldoDevedor: z.number()
    .positive("Atualização do saldo devedor deve ser positiva")
    .max(9999999999.99, "Atualização do saldo devedor é muito alta").optional(),

  imovel: z.object({
    id: z.number().positive("ID do imóvel deve ser positivo") // Supondo que Imovel tenha um campo ID
  }).optional(), // Dependendo de como a relação é criada, pode ser opcional.

  imovelId: z.string().uuid("O ID do imóvel deve ser um UUID válido"),
});

export class UpdateAquisicaoImovelRequestDto extends AbstractDTO<typeof updateAquisicaoImovelSchema> {

  protected rules() {
    return updateAquisicaoImovelSchema;
  }

}
