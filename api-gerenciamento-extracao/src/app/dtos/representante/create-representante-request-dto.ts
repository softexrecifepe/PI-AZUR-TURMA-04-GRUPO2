import z from "zod";
import { EstadoCivil } from "../../models/enums/estadoCivil.enum";
import { AbstractDTO } from "../abstract.dto";

const createRepresentanteSchema = z.object({
    id: z.number().optional(), // id é opcional na criação
    nome: z.string().min(1, 'O nome é obrigatório').max(255, 'O nome deve ter no máximo 255 caracteres'),
    nacionalidade: z.string().min(1, 'A nacionalidade é obrigatória').max(65, 'A nacionalidade deve ter no máximo 65 caracteres'),
    estadoCivil: z.nativeEnum(EstadoCivil, { errorMap: () => ({ message: "Estado civil inválido" }) }), // validação do estado civil com enum
    dataNascimento: z.string().refine(date => !isNaN(Date.parse(date)), 'Data de nascimento inválida'),
    profissao: z.string().min(1, 'A profissão é obrigatória').max(100, 'A profissão deve ter no máximo 100 caracteres'),
    numDocumento: z.string().min(1, 'O número do documento é obrigatório').max(50, 'O número do documento deve ter no máximo 50 caracteres'),
    dataExpedicao: z.string().refine(date => !isNaN(Date.parse(date)), 'Data de expedição inválida'),
    cpf: z.string().regex(/^\d{11}$/, 'O CPF deve ter 11 dígitos e ser numérico')
});

export class CreateRepresentanteRequestDto extends AbstractDTO <typeof createRepresentanteSchema> {
    protected rules(){
        return createRepresentanteSchema;
    }
}