import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco  } from "../../models/endereco.model";
import { Representante } from "../../models/representante.model";

const updateCredoraSchema = z.object({
nomeCredora: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caractere").optional(),
nomeDoravante: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caractere").optional(),
cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos").optional(),
representanteId: z.string().uuid("O ID do representante deve ser um UUID válido").optional(),

});

export class UpdateCredoraRequestDto extends AbstractDTO<typeof updateCredoraSchema> {

    protected rules() {
        return updateCredoraSchema;
    }

}