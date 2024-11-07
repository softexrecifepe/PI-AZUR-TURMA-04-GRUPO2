import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

const updateSocioSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres").optional(),
  nacionalidade: z.string().min(2, "Nacionalidade é obrigatória").max(65, "Nacionalidade pode ter no máximo 65 caracteres").optional(),
  dataNascimento: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()).refine(date => date <= new Date(), "Data de nascimento não pode ser no futuro").optional(),
  profissao: z.string().min(1, "Profissão é obrigatória").max(100, "Profissão pode ter no máximo 100 caracteres").optional(),
  email: z.string().email("Email inválido").max(100, "Email pode ter no máximo 100 caracteres").optional(),
  numeroCarteiraFuncional: z.string().min(1, "Número da carteira funcional é obrigatório").max(50, "Número da carteira funcional pode ter no máximo 50 caracteres").optional(),
  dataExpedicaoCREA: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()).refine(date => date <= new Date(), "Data de expedição não pode ser no futuro").optional(),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos").optional(),
  estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }).optional(),
  nome_mae: z.string().min(1, "Nome da mãe é obrigatório").max(255, "Nome da mãe pode ter no máximo 255 caracteres").optional(),
  orgaoExpedidor: z.string().min(3, "Precisa ter 3").max(100, "O máximo é 100"),
  regimeComunhao: z.string().min(3, "Precisa ter 3").max(100, "O máximo é 100"),
  nome_pai: z.string().max(255, "Nome do pai pode ter no máximo 255 caracteres").optional(),
});


export class UpdateSocioRequestDto extends AbstractDTO<typeof updateSocioSchema> {

  protected rules() {
    return updateSocioSchema;
  }

}