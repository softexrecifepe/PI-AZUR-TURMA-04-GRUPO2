import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";

const createCompradorSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').max(255, 'O nome deve ter no máximo 255 caracteres'),
    nacionalidade: z.string().min(1, 'A nacionalidade é obrigatória').max(65, 'A nacionalidade deve ter no máximo 65 caracteres'),
    dataNascimento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de nascimento deve estar no formato YYYY-MM-DD")
        .transform((str) => new Date(str))
        .refine((date) => date <= new Date(), "Data de nascimento não pode ser no futuro"),
    profissao: z.string().min(1, 'A profissão é obrigatória').max(100, 'A profissão deve ter no máximo 100 caracteres'),
    filiacao: z.string().min(1, 'A filiação é obrigatória').max(255, 'A filiação deve ter no máximo 255 caracteres'),
    email: z.string().email('Email inválido'),
    documento: z.string().min(1, 'O número do documento é obrigatório').max(50, 'O documento deve ter no máximo 50 caracteres'),
    orgaoExpedidor: z.string().min(1, 'O órgão expedidor é obrigatório').max(50, 'O órgão expedidor deve ter no máximo 50 caracteres'),
    dataExpedicao: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
        .transform((str) => new Date(str))
        .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro"),
    cpf: z.string().regex(/^\d{11}$/, 'O CPF deve ter 11 dígitos e ser numérico'),
    estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }),
    endereco: z.string().min(1, 'O endereço é obrigatório').max(255, 'O endereço deve ter no máximo 255 caracteres'),
    formaPagamento: z.string().min(1, 'A forma de pagamento é obrigatória').max(100, 'A forma de pagamento deve ter no máximo 100 caracteres'),
    rendaComprovada: z.number().nonnegative('A renda comprovada não pode ser negativa'),
    rendaNaoComprovada: z.number().nonnegative('A renda não comprovada não pode ser negativa')
});

export class CreateCompradorRequestDto extends AbstractDTO<typeof createCompradorSchema> {
    protected rules() {
        return createCompradorSchema;
      }
}
