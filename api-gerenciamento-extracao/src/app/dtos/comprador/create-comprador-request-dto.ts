import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

const createCompradorSchema = z.object({
  nome: z.string()
    .min(3, "Nome é obrigatório e deve ter no mínimo 3 caracteres")
    .max(255, "Nome pode ter no máximo 255 caracteres"),

  nacionalidade: z.string()
    .min(3, "Nacionalidade é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Nacionalidade pode ter no máximo 255 caracteres"),

  dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro"),

  profissao: z.string()
    .min(3, "Profissão é obrigatória e deve ter no mínimo 3 caracteres")
    .max(255, "Profissão pode ter no máximo 255 caracteres"),

  nome_mae: z.string().min(1, "Nome da mãe é obrigatório").max(255, "Nome da mãe pode ter no máximo 255 caracteres"),
  nome_pai: z.string().max(255, "Nome do pai pode ter no máximo 255 caracteres").optional(),

  email: z.string()
    .email("Email deve ser um endereço de e-mail válido")
    .max(255, "Email pode ter no máximo 255 caracteres"),

  numDocumento: z.string()
    .min(3, "Documento é obrigatório e deve ter no mínimo 3 caracteres")
    .max(20, "Documento pode ter no máximo 20 caracteres"),

  orgaoExpedidor: z.string()
    .min(2, "Órgão Expedidor é obrigatório e deve ter no mínimo 2 caracteres")
    .max(50, "Órgão Expedidor pode ter no máximo 50 caracteres"),

  regimeComunhao: z.string().min(3, "Precisa ter 3").max(100, "O máximo é 100").optional(),

  dataExpedicao:  z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
  .transform((str) => new Date(str))
  .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro"),

  cpf: z.string()
    .regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos"),

  estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }),

  enderecoId: z.string().uuid("O ID do endereço deve ser um UUID válido"),

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

export class CreateCompradorRequestDto extends AbstractDTO<typeof createCompradorSchema> {

  protected rules() {
    return createCompradorSchema;
  }

}
