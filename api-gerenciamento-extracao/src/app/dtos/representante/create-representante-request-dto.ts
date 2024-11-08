import z from "zod";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";
import { AbstractDTO } from "../abstract.dto";

const createRepresentanteSchema = z.object({
    nome: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
  nacionalidade: z.string().min(2, "Nacionalidade é obrigatória").max(65, "Nacionalidade pode ter no máximo 65 caracteres"),
  dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro"),
  profissao: z.string().min(1, "Profissão é obrigatória").max(100, "Profissão pode ter no máximo 100 caracteres"),
  email: z.string().email("Email inválido").max(100, "Email pode ter no máximo 100 caracteres"),
  numDocumento: z.string().min(1, "Número da carteira funcional é obrigatório").max(50, "Número da carteira funcional pode ter no máximo 50 caracteres"),
  dataExpedicao:  z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
  .transform((str) => new Date(str))
  .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),
  estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }),
  orgaoExpedidor: z.string().min(3, "Precisa ter 3").max(100, "O máximo é 100"),
  regimeComunhao: z.string().min(3, "Precisa ter 3").max(100, "O máximo é 100"),
  nome_mae: z.string().min(1, "Nome da mãe é obrigatório").max(255, "Nome da mãe pode ter no máximo 255 caracteres"),
  nome_pai: z.string().max(255, "Nome do pai pode ter no máximo 255 caracteres").optional(),
  enderecoId: z.string().uuid("O ID do imóvel deve ser um UUID válido").optional(),
});

export class CreateRepresentanteRequestDto extends AbstractDTO <typeof createRepresentanteSchema> {
    protected rules(){
        return createRepresentanteSchema;
    }
}