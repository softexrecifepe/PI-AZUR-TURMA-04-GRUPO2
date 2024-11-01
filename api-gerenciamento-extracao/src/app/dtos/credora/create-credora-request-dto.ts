import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco } from "../../models/endereco.model";

const createCredoraSchema = z.object({
    nome: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
    cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"),
})

export class CreateCredoraRequestDto extends AbstractDTO<typeof createCredoraSchema> {

    protected rules() {
        return createCredoraSchema;
    }

}