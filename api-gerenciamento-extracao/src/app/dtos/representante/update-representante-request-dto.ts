import z from "zod";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";
import { AbstractDTO } from "../abstract.dto";

const updateRepresentanteSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').max(255, 'O nome deve ter no máximo 255 caracteres').optional(),
    nacionalidade: z.string().min(1, 'A nacionalidade é obrigatória').max(65, 'A nacionalidade deve ter no máximo 65 caracteres').optional(),
    estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }).optional(), 
    dataNascimento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro").optional(),
    profissao: z.string().min(1, 'A profissão é obrigatória').max(100, 'A profissão deve ter no máximo 100 caracteres').optional(),
    numDocumento: z.string().min(1, 'O número do documento é obrigatório').max(50, 'O número do documento deve ter no máximo 50 caracteres').optional(),
    dataExpedicao:  z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro").optional(),
    cpf: z.string().regex(/^\d{11}$/, 'O CPF deve ter 11 dígitos e ser numérico').optional()
});

export class UpdateRepresentanteRequestDto extends AbstractDTO <typeof updateRepresentanteSchema> {
    protected rules(){
        return updateRepresentanteSchema;
    }
}