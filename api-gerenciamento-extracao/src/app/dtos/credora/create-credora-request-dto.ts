import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco } from "../../models/endereco.model";
import { Representante } from "../../models/representante.model";

const createCredoraSchema = z.object({
    nomeCredora: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
    nomeDoravante: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
    cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"),
    representanteId: z.string().uuid("O ID do representante deve ser um UUID válido"),
})

export class CreateCredoraRequestDto extends AbstractDTO<typeof createCredoraSchema> {

    protected rules() {
        return createCredoraSchema;
    }

}