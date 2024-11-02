import z from "zod";
import { AbstractDTO } from "../abstract.dto";

const updateCompradorSchema = z.object({
  nome: z.string()
    .min(3, "Nome é obrigatório e deve ter no mínimo 3 caracteres")
    .max(255, "Nome pode ter no máximo 255 caracteres"),

  nacionalidade: z.string()
    .min(3, "Nacionalidade é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Nacionalidade pode ter no máximo 255 caracteres"),

  dataNascimento: z.date()
    .refine(date => date <= new Date(), "Data de nascimento deve ser uma data no passado"),

  profissao: z.string()
    .min(3, "Profissão é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Profissão pode ter no máximo 255 caracteres"),

  filiacao: z.string()
    .min(3, "Filiação é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Filiação pode ter no máximo 255 caracteres"),

  email: z.string()
    .email("Email deve ser um endereço de e-mail válido")
    .max(255, "Email pode ter no máximo 255 caracteres"),

  documento: z.string()
    .min(3, "Documento é obrigatório e deve ter no mínimo 3 caracteres")
    .max(20, "Documento pode ter no máximo 20 caracteres"),

  orgaoExpedidor: z.string()
    .min(2, "Órgão Expedidor é obrigatório e deve ter no mínimo 2 caracteres")
    .max(50, "Órgão Expedidor pode ter no máximo 50 caracteres"),

  dataExpedicao: z.date()
    .refine(date => date <= new Date(), "Data de expedição deve ser uma data no passado"),

  cpf: z.string()
    .regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos"),

  estadoCivil: z.string()
    .min(3, "Estado civil é obrigatório e deve ter no mínimo 3 caracteres")
    .max(255, "Estado civil pode ter no máximo 255 caracteres"),

  endereco: z.string()
    .min(10, "Endereço é obrigatório e deve ter no mínimo 10 caracteres")
    .max(255, "Endereço pode ter no máximo 255 caracteres"),

  formaPagamento: z.string()
    .min(3, "Forma de pagamento é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Forma de pagamento pode ter no máximo 255 caracteres"),

  rendaComprovada: z.number()
    .positive("Renda comprovada deve ser um valor positivo")
    .max(9999999999.99, "Renda comprovada é muito alta"),

  rendaNaoComprovada: z.number()
    .positive("Renda não comprovada deve ser um valor positivo")
    .max(9999999999.99, "Renda não comprovada é muito alta"),
});

export class UpdateCompradorRequestDto extends AbstractDTO<typeof updateCompradorSchema> {

  protected rules() {
    return updateCompradorSchema;
  }

}
