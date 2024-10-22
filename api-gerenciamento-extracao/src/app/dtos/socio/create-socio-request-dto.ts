import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

const createSocioSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
  nacionalidade: z.string().min(2, "Nacionalidade é obrigatória").max(65, "Nacionalidade pode ter no máximo 65 caracteres"),
  dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro"),
  profissao: z.string().min(1, "Profissão é obrigatória").max(100, "Profissão pode ter no máximo 100 caracteres"),
  email: z.string().email("Email inválido").max(100, "Email pode ter no máximo 100 caracteres"),
  numeroCarteiraFuncional: z.string().min(1, "Número da carteira funcional é obrigatório").max(50, "Número da carteira funcional pode ter no máximo 50 caracteres"),
  dataExpedicaoCREA:  z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
  .transform((str) => new Date(str))
  .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),
  estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }),
  nome_mae: z.string().min(1, "Nome da mãe é obrigatório").max(255, "Nome da mãe pode ter no máximo 255 caracteres"),
  nome_pai: z.string().max(255, "Nome do pai pode ter no máximo 255 caracteres").optional(),
})


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSocioRequestDto:
 *       type: object
 *       required:
 *         - nome
 *         - nacionalidade
 *         - dataNascimento
 *         - profissao
 *         - email
 *         - numeroCarteiraFuncional
 *         - dataExpedicaoCREA
 *         - cpf
 *         - estadoCivil
 *         - nome_mae
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do sócio
 *         nacionalidade:
 *           type: string
 *           description: Nacionalidade do sócio
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento no formato YYYY-MM-DD
 *         profissao:
 *           type: string
 *           description: Profissão do sócio
 *         email:
 *           type: string
 *           description: Email do sócio
 *         numeroCarteiraFuncional:
 *           type: string
 *           description: Número da carteira funcional
 *         dataExpedicaoCREA:
 *           type: string
 *           format: date
 *           description: Data de expedição da carteira
 *         cpf:
 *           type: string
 *           description: CPF do sócio
 *         estadoCivil:
 *           type: string
 *           enum: [Solteiro, Casado, Divorciado, Viúvo]
 *           description: Estado civil do sócio
 *         nome_mae:
 *           type: string
 *           description: Nome da mãe do sócio
 *         nome_pai:
 *           type: string
 *           description: Nome do pai do sócio (opcional)
 */
export class CreateSocioRequestDto extends AbstractDTO<typeof createSocioSchema> {

  protected rules() {
    return createSocioSchema;
  }

}