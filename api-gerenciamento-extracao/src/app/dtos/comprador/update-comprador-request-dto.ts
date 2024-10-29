import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

const createCompradorSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').max(255, 'O nome deve ter no máximo 255 caracteres').optional(),
    nacionalidade: z.string().min(1, 'A nacionalidade é obrigatória').max(65, 'A nacionalidade deve ter no máximo 65 caracteres').optional(),
    dataNascimento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
        .transform((str) => new Date(str))
        .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro").optional(),
    profissao: z.string().min(1, 'A profissão é obrigatória').max(100, 'A profissão deve ter no máximo 100 caracteres').optional(),
    filiacao: z.string().min(1, 'A filiação é obrigatória').max(255, 'A filiação deve ter no máximo 255 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
    documento: z.string().min(1, 'O número do documento é obrigatório').max(50, 'O documento deve ter no máximo 50 caracteres').optional(),
    orgaoExpedidor: z.string().min(1, 'O órgão expedidor é obrigatório').max(50, 'O órgão expedidor deve ter no máximo 50 caracteres').optional(),
    dataExpedicao: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
        .transform((str) => new Date(str))
        .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro").optional(),
    cpf: z.string().regex(/^\d{11}$/, 'O CPF deve ter 11 dígitos e ser numérico').optional(),
    estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }).optional(),
    endereco: z.string().min(1, 'O endereço é obrigatório').max(255, 'O endereço deve ter no máximo 255 caracteres').optional(),
    formaPagamento: z.string().min(1, 'A forma de pagamento é obrigatória').max(100, 'A forma de pagamento deve ter no máximo 100 caracteres').optional(),
    rendaComprovada: z.number().nonnegative('A renda comprovada não pode ser negativa').optional(),
    rendaNaoComprovada: z.number().nonnegative('A renda não comprovada não pode ser negativa').optional(),
});

export class CreateCompradorRequestDto extends AbstractDTO<typeof createCompradorSchema> {
    protected rules() {
        return createCompradorSchema;
      }
}
